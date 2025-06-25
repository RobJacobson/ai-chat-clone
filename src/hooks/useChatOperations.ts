import { router } from "expo-router";

import { useChatAPI } from "@/hooks/useChatAPI";
import { useChatStore } from "@/store/chatStore";

export interface SendMessageParams {
  message: string;
  imageBase64?: string | null;
  chatId?: string | null;
}

export interface ChatOperationResult {
  success: boolean;
  chatId?: string;
  error?: string;
}

export const useChatOperations = () => {
  const { addNewMessage, createNewChat, chatHistory } = useChatStore(
    (state) => ({
      addNewMessage: state.addNewMessage,
      createNewChat: state.createNewChat,
      chatHistory: state.chatHistory,
    })
  );

  const { sendUserMessage, isLoading, error: apiError, clearError: clearApiError } = useChatAPI();

  const getPreviousResponseId = (chatId: string): string | null => {
    const chat = chatHistory.find((chat) => chat.id === chatId);
    const previousResponse = chat?.messages.at(-1);
    return previousResponse?.responseId ?? null;
  };

  const sendMessage = async ({
    message,
    imageBase64,
    chatId,
  }: SendMessageParams): Promise<ChatOperationResult> => {
    if (!message.trim()) {
      return { success: false, error: "Message cannot be empty" };
    }

    if (isLoading) {
      return { success: false, error: "Another message is being sent" };
    }

    try {
      // Create new chat if needed
      const currentChatId = chatId || createNewChat(message);

      // Add user message to state immediately
      const userMessage = addNewMessage(currentChatId, {
        role: "user",
        message,
        ...(imageBase64 && { image: imageBase64 }),
      });

      const previousResponseId = getPreviousResponseId(currentChatId);

      // Send message to API
      await sendUserMessage(currentChatId, userMessage, previousResponseId);

      return { success: true, chatId: currentChatId };
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to send message",
      };
    }
  };

  const navigateToChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return {
    sendMessage,
    navigateToChat,
    isLoading,
    error: apiError,
    clearError: clearApiError,
    getPreviousResponseId,
  };
};
