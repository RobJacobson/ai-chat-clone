import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import ChatInput from "~/components/ChatInput";
import MessageList from "~/components/MessageList";
import { Text } from "~/components/ui/text";
import { useChatAPI } from "~/hooks/useChatAPI";
import { useChatStore } from "~/store/chatStore";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const chat = useChatStore((state) => state.chatHistory).find(
    (chat) => chat.id === id
  );
  const { sendMessage, isLoading } = useChatAPI();

  const handleSend = async (message: string) => {
    if (!chat) return;

    const previousResponseId = chat.messages.at(-1)?.responseId;
    await sendMessage(chat.id, message, previousResponseId);
  };

  if (!chat) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Chat not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MessageList messages={chat.messages} />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </View>
  );
};

export default ChatScreen;
