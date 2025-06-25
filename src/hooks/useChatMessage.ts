import { useState } from "react";

export const useChatMessage = () => {
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
