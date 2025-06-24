import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import ChatInput from "@/components/ChatInput";
import { Text } from "@/components/ui/text";

const HomeScreen = () => {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 font-bold text-3xl">AI Chat Clone</Text>
      </View>
      <ChatInput chatId={null} />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
