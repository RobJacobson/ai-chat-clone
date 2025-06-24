import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import ChatInput from "@/components/ChatInput";
import { Text } from "@/components/ui/text";
import { useChatAPI } from "~/hooks/useChatAPI";
import { useChatStore } from "~/store/chatStore";

const HomeScreen = () => {
  const { createNewChat } = useChatStore((state) => state);
  const { sendMessage } = useChatAPI();

  const handleSend = async (message: string) => {
    const newChatId = createNewChat(message);
    router.push(`/chat/${newChatId}`);
    await sendMessage(newChatId, message);
  };

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 font-bold text-3xl">AI Chat Clone</Text>
      </View>
      <ChatInput onSend={handleSend} isLoading={false} />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
