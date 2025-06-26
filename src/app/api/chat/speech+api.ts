import OpenAI from "openai";
import { toFile } from "openai/uploads";

// Polyfill File for environments where it's not available
if (typeof globalThis.File === "undefined") {
  (globalThis as any).File = class File extends Blob {
    name: string;
    lastModified: number;
    webkitRelativePath: string;

    constructor(fileBits: BlobPart[], fileName: string, options: any = {}) {
      super(fileBits, options);
      this.name = fileName;
      this.lastModified = options.lastModified || Date.now();
      this.webkitRelativePath = "";
    }
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(request: Request) {
  const { audioBase64, previousResponseId } = await request.json();

  try {
    // Convert base64 to buffer and use OpenAI's toFile helper
    const audioBuffer = Buffer.from(audioBase64, "base64");
    const audioFile = await toFile(audioBuffer, "audio.m4a");

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    });

    console.log("transcription", transcription);

    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: transcription.text,
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    });

    return Response.json({
      responseId: response.id,
      responseMessage: response.output_text,
      transcribedMessage: transcription.text,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
