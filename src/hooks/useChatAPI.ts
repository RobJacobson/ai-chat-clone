import { useState } from "react";

import { type MessageType, useChatStore } from "@/store/chatStore";

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addNewMessage = useChatStore((state) => state.addNewMessage);

  const sendUserMessage = async (
    chatId: string,
    messageData: MessageType,
    previousResponseId?: string | null
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageData.message,
          image: messageData.image,
          previousResponseId,
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Add AI response to state
      addNewMessage(chatId, {
        role: "assistant",
        message: data.responseMessage,
        responseId: data.responseId,
      });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    sendUserMessage,
    isLoading,
    error,
    clearError,
  };
};
