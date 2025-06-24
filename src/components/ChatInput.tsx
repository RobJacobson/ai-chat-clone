import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChatAPI } from "~/hooks/useChatAPI";
import { useTheme } from "~/hooks/useTheme";
import { useChatStore } from "~/store/chatStore";

import { Button } from "./ui/button";

const ChatInput = ({ chatId }: { chatId: string | null }) => {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { colors } = useTheme();

  // Optimized selectors - only re-render when these specific values change
  const addNewMessage = useChatStore((state) => state.addNewMessage);
  const createNewChat = useChatStore((state) => state.createNewChat);
  const chatHistory = useChatStore((state) => state.chatHistory);

  const { sendUserMessage } = useChatAPI();

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const currentChatId = !chatId ? createNewChat(message) : chatId;

      // Add user message to state immediately
      const userMessage = addNewMessage(currentChatId, {
        role: "user",
        message,
        ...(imageBase64 && { image: imageBase64 }),
      });

      // Clear input immediately
      setMessage("");
      setImageBase64(null);

      // Navigate to chat if it's a new chat
      if (!chatId) {
        router.push(`/chat/${currentChatId}`);
      }

      // Get previous response ID for context
      const chat = chatHistory.find((chat) => chat.id === currentChatId);
      const previousResponse = chat?.messages.at(-1);
      const previousResponseId = previousResponse?.responseId ?? null;

      // Send message to API (this will also add the AI response to state)
      await sendUserMessage(currentChatId, userMessage, previousResponseId);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 20}
      className="w-full"
    >
      <View
        className="m-0 w-full rounded-t-3xl bg-muted"
        style={{ paddingBottom: insets.bottom }}
      >
        {imageBase64 && (
          <ImageBackground
            source={{ uri: imageBase64 }}
            className="mx-3 mt-2 h-16 w-16"
            imageClassName="rounded-xl;"
          >
            <AntDesign
              name="closecircle"
              size={24}
              color={colors.foreground}
              onPress={() => setImageBase64(null)}
              className="absolute top-0 right-0"
            />
          </ImageBackground>
        )}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ask anything..."
          placeholderTextColor="gray"
          multiline
          className="px-4 pt-6 pb-6 text-foreground"
        />
        <View className="m-2 flex-row items-center justify-between">
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={colors.foreground}
            onPress={pickImage}
          />
          {message ? (
            <MaterialCommunityIcons
              name="arrow-up-circle"
              size={30}
              color={colors.foreground}
              className=""
              onPress={handleSend}
            />
          ) : (
            <Button className="flex flex-row gap-2 rounded-full" size="sm">
              <MaterialCommunityIcons
                name="account-voice"
                size={15}
                color={colors.primaryForeground}
              />
              <Text className="text-primary-foreground text-sm">Voice</Text>
            </Button>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatInput;
