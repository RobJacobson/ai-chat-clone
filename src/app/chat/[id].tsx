import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import ChatInput from "~/components/ChatInput";
import MessageList from "~/components/MessageList";
import { Text } from "~/components/ui/text";
import { useChatStore } from "~/store/chatStore";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const chat = useChatStore((state) => state.chatHistory).find(
    (chat) => chat.id === id
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    console.log("Sending message:", message);
  };

  if (!chat) {
    return (
      <View>
        <Text>Chat {id} not found</Text>
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
