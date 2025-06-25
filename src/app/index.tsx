import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import ChatInput from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useChatStore } from "@/store/chatStore";

const HomeScreen = () => {
  const clearAllData = useChatStore((state) => state.clearAllData);

  const handleClearStorage = async () => {
    await clearAllData();
    console.log("Storage cleared for debugging");
  };

  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text className="mb-4 font-bold text-3xl">AI Chat Clone</Text>
        {/* DEBUG: Remove this button when done debugging */}
        <Button onPress={handleClearStorage} className="mb-4">
          <Text>Clear Storage (Debug)</Text>
        </Button>
      </View>
      <ChatInput />
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;
