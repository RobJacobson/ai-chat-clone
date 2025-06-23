import chatHistory from "@assets/data/chatHistory.json";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import ChatInput from "~/components/ChatInput";
import MessageListItem from "~/components/MessageListItem";
import { Text } from "~/components/ui/text";
import type { Message } from "~/types/types";

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
        <Text>Chat {id} not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={chat.messages as Array<Message>}
        renderItem={({ item }) => <MessageListItem messageItem={item} />}
        keyExtractor={(item) => item.id}
      />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </View>
  );
};

export default ChatScreen;
