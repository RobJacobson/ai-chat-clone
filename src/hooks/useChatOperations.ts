import { router } from "expo-router";

import { useChatStore } from "@/store/chatStore";

export interface SendMessageParams {
  message: string;
  imageBase64?: string | null;
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

  const sendMessage = async ({
    message,
    imageBase64,
    chatId,
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
    });

    const previousResponseId = getPreviousResponseId(currentChatId);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          image: imageBase64,
          previousResponseId,
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Add AI response to state
      addNewMessage(currentChatId, {
        role: "assistant",
        message: data.responseMessage,
        responseId: data.responseId,
      });
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
