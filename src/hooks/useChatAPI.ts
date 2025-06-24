import { useState } from "react";

import { useChatStore } from "~/store/chatStore";

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { addNewMessage } = useChatStore((state) => state);

  const sendMessage = async (
    chatId: string,
    message: string,
    previousResponseId?: string
  ) => {
    setIsLoading(true);

    // Add user message
    addNewMessage(chatId, {
      role: "user",
      message,
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          previousResponseId,
        }),
      });

      const data = await response.json();

      console.log("data", data);
      if (!response.ok) {
        throw new Error(data.error);
      }

      const aiResponseMessage = {
        message: data.responseMessage,
        responseId: data.responseId,
        role: "assistant" as const,
      };

      addNewMessage(chatId, aiResponseMessage);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading,
  };
};
