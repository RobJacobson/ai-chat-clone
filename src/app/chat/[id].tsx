import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import ChatInput from "~/components/ChatInput";
import MessageList from "~/components/MessageList";
import { Text } from "~/components/ui/text";
import { useChatStore } from "~/store/chatStore";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const chat = useChatStore((state) =>
    state.chatHistory.find((chat) => chat.id === id)
  );

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
      <ChatInput chatId={chat.id} />
    </View>
  );
};

export default ChatScreen;
