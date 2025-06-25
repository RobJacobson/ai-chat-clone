import { useChatInput } from "./useChatInput";
import { useChatOperations } from "./useChatOperations";
import { useImagePicker } from "./useImagePicker";

interface ChatInputControllerProps {
  chatId: string | null;
}

export const useChatInputController = ({
  chatId,
}: ChatInputControllerProps) => {
  const { message, setMessage, clearMessage, hasMessage } = useChatInput();
  const { imageBase64, pickImage, clearImage } = useImagePicker();
  const { sendMessage, navigateToChat, isLoading, error, clearError } =
    useChatOperations();

  const clearInput = () => {
    clearMessage();
    clearImage();
    clearError();
  };

  const handleSend = async () => {
    if (!hasMessage || isLoading) return;

    const result = await sendMessage({
      message,
      imageBase64,
      chatId,
    });

    if (result.success) {
      clearInput();

      // Navigate to chat if it's a new chat
      if (!chatId && result.chatId) {
        navigateToChat(result.chatId);
      }
    }
    // Error is automatically managed by useChatOperations
  };

  return {
    // Input state
    message,
    setMessage,
    hasMessage,

    // Image state
    imageBase64,
    pickImage,
    clearImage,

    // Operations
    handleSend,
    clearInput,

    // Status
    isLoading,
    error,
    clearError,
  };
};
