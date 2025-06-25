import { router } from "expo-router";

import { createAIImage, getTextResponse } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";

export interface SendMessageParams {
  message: string;
  imageBase64: string | null;
  chatId?: string | null;
}

export const useChatOperations = () => {
  const setIsWaitingForResponse = useChatStore(
    (state) => state.setIsWaitingForResponse
  );
  const addNewMessage = useChatStore((state) => state.addNewMessage);
  const createNewChat = useChatStore((state) => state.createNewChat);
  const chatHistory = useChatStore((state) => state.chatHistory);

  const getPreviousResponseId = (chatId: string) =>
    chatHistory.find((chat) => chat.id === chatId)?.messages.at(-1)?.responseId;

  const sendMessage = async (
    { message, imageBase64, chatId }: SendMessageParams,
    isGeneratingImage: boolean
  ) => {
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
    });

    const previousResponseId = getPreviousResponseId(currentChatId);

    try {
      const data = isGeneratingImage
        ? await createAIImage(message)
        : await getTextResponse(message, imageBase64, previousResponseId);

      const aiResponseMessage = isGeneratingImage
        ? {
            id: Date.now().toString(),
            role: "assistant" as const,
            image: data.image,
          }
        : {
            id: Date.now().toString(),
            role: "assistant" as const,
            message: data.responseMessage,
            responseId: data.responseId,
          };

      // Add AI response to state
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
