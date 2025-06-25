import { useState } from "react";

export const useChatInput = () => {
  const [message, setMessage] = useState("");

  const clearMessage = () => {
    setMessage("");
  };

  const hasMessage = Boolean(message.trim());

  return {
    message,
    setMessage,
    clearMessage,
    hasMessage,
  };
}; 