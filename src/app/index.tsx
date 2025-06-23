import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";

import ChatInput from "@/components/ChatInput";
import { Text } from "@/components/ui/text";
import { useChatStore } from "~/store/chatStore";

const HomeScreen = () => {
  const { createNewChat, addNewMessage } = useChatStore((state) => state);

  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    console.log("Sending message:", message);
    const newChatId = createNewChat(message.slice(0, 50));

    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      message,
    } as const;
    addNewMessage(newChatId, newMessage);
    router.push(`/chat/${newChatId}`);

    try {
      console.log("Fetching data");
      const response = await fetch("/api/chat");
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 font-bold text-3xl">AI Chat Clone</Text>
      </View>
      <ChatInput onSend={handleSend} isLoading={isLoading} />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
