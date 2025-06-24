import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export const POST = async (request: Request) => {
  const { message, previousResponseId } = await request.json();

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: message,
      ...(previousResponseId && { previous_response_id: previousResponseId }),
    });

    return Response.json({
      responseId: response.id,
      responseMessage: response.output_text,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
};
