import { router } from "expo-router";

import {
  createAIImage,
  getSpeechResponse,
  getTextResponse,
} from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";

export interface SendMessageParams {
  chatId?: string;
  message: string;
  imageBase64: string | null;
  audioBase64: string | null;
  isGeneratingImage: boolean;
}

type APIResponse =
  | { image: string }
  | {
      responseMessage: string;
      responseId: string;
      transcribedMessage?: string;
    };

export const useChatOperations = () => {
  const setIsWaitingForResponse = useChatStore(
    (state) => state.setIsWaitingForResponse
  );
  const addNewMessage = useChatStore((state) => state.addNewMessage);
  const createNewChat = useChatStore((state) => state.createNewChat);
  const chatHistory = useChatStore((state) => state.chatHistory);

  const getPreviousResponseId = (chatId: string) =>
    chatHistory.find((chat) => chat.id === chatId)?.messages.at(-1)?.responseId;

  const sendMessage = async ({
    chatId,
    message,
    imageBase64,
    audioBase64,
    isGeneratingImage,
  }: SendMessageParams) => {
    setIsWaitingForResponse(true);

    // Create new chat and navigate to it if needed
    const currentChatId = chatId || createNewChat(message);
    if (!chatId) {
      router.push(`/chat/${currentChatId}`);
    }

    // Add user message to state
    addNewMessage(currentChatId, {
      role: "user",
      message,
      ...(imageBase64 && { image: imageBase64 }),
      ...(audioBase64 && { audio: audioBase64 }),
    });

    const previousResponseId = getPreviousResponseId(currentChatId);

    try {
      const data = await fetchResponse(
        message,
        imageBase64,
        audioBase64,
        isGeneratingImage,
        previousResponseId
      );

      const aiResponseMessage = createResponseMessage(
        data,
        isGeneratingImage,
        audioBase64
      );

      // Add AI response to state

      if (audioBase64) {
        const userMessage = {
          role: "user",
          message: data.transcribedMessage,
        } as const;
        addNewMessage(currentChatId, userMessage);
      }

      addNewMessage(currentChatId, aiResponseMessage);
    } catch (error) {
      console.error("Chat error:", error);
      throw error;
    } finally {
      setIsWaitingForResponse(false);
    }
  };

  return {
    sendMessage,
  };
};

const fetchResponse = async (
  message: string,
  imageBase64: string | null,
  audioBase64: string | null,
  isGeneratingImage: boolean,
  previousResponseId?: string
) => {
  if (isGeneratingImage) return createAIImage(message);
  if (audioBase64) return getSpeechResponse(audioBase64, previousResponseId);
  return getTextResponse(message, imageBase64, previousResponseId);
};

const createResponseMessage = (
  data: APIResponse,
  isGeneratingImage: boolean,
  audioBase64: string | null
) => {
  if (isGeneratingImage) {
    const imageData = data as { image: string };
    return { role: "assistant" as const, image: imageData.image };
  }
  const textData = data as {
    responseMessage: string;
    responseId: string;
    transcribedMessage?: string;
  };
  if (audioBase64) {
    return {
      role: "assistant" as const,
      message: textData.responseMessage,
      responseId: textData.responseId,
      transcribedMessage: textData.transcribedMessage,
    };
  }
  return {
    role: "assistant" as const,
    message: textData.responseMessage,
    responseId: textData.responseId,
  };
};
