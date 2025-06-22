import chatHistory from "@assets/data/chatHistory.json";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import ChatInput from "~/components/ChatInput";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const chat = chatHistory.find((chat) => chat.id === id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    console.log("Sending message:", message);
  };

  if (!chat) {
    return (
      <View>
        r<Text>Chat {id} not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Text className="flex-1 text-white">Chat Screen {id}</Text>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </View>
  );
};

export default ChatScreen;
