import OpenAI from "openai";

import { UI_CONSTANTS } from "@/lib/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export async function POST(request: Request) {
  const { message, image, previousResponseId } = await request.json();

  // Build messages array for chat completion
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];

  if (image) {
    messages.push({
      role: "user",
      content: [
        { type: "text", text: message },
        { type: "image_url", image_url: { url: image } },
      ],
    });
  } else {
    messages.push({ role: "user", content: message });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using correct model name
      messages,
      max_tokens: UI_CONSTANTS.MAX_TOKENS,
    });

    const responseMessage =
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return Response.json({
      responseId: response.id,
      responseMessage,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
