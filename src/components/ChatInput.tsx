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

import { useChatAPI } from "@/hooks/useChatAPI";
import { useTheme } from "@/hooks/useTheme";
import { UI_CONSTANTS } from "@/lib/constants";
import { useChatStore } from "@/store/chatStore";

import { Button } from "./ui/button";

interface ChatInputProps {
  chatId: string | null;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { colors } = useTheme();

  // Optimized selectors
  const { addNewMessage, createNewChat, chatHistory } = useChatStore(
    (state) => ({
      addNewMessage: state.addNewMessage,
      createNewChat: state.createNewChat,
      chatHistory: state.chatHistory,
    })
  );

  const { sendUserMessage, isLoading } = useChatAPI();

  const clearInput = () => {
    setMessage("");
    setImageBase64(null);
  };

  const getPreviousResponseId = (currentChatId: string): string | null => {
    const chat = chatHistory.find((chat) => chat.id === currentChatId);
    const previousResponse = chat?.messages.at(-1);
    return previousResponse?.responseId ?? null;
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    try {
      const currentChatId = !chatId ? createNewChat(message) : chatId;

      // Add user message to state immediately
      const userMessage = addNewMessage(currentChatId, {
        role: "user",
        message,
        ...(imageBase64 && { image: imageBase64 }),
      });

      // Clear input immediately for better UX
      clearInput();

      // Navigate to chat if it's a new chat
      if (!chatId) {
        router.push(`/chat/${currentChatId}`);
      }

      const previousResponseId = getPreviousResponseId(currentChatId);

      // Send message to API
      await sendUserMessage(currentChatId, userMessage, previousResponseId);
    } catch (error) {
      console.error("Error sending message:", error);
      // Could add toast notification here
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        quality: 0.8, // Reduce quality for better performance
        allowsEditing: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setImageBase64(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const keyboardVerticalOffset = Platform.select({
    ios: UI_CONSTANTS.KEYBOARD_OFFSET_IOS,
    android: UI_CONSTANTS.KEYBOARD_OFFSET_ANDROID,
    default: 0,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
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
            imageClassName="rounded-xl"
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
          placeholder={UI_CONSTANTS.MESSAGE_INPUT_PLACEHOLDER}
          placeholderTextColor="gray"
          multiline
          className="px-4 pt-6 pb-6 text-foreground"
          editable={!isLoading}
        />
        <View className="m-2 flex-row items-center justify-between">
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={colors.foreground}
            onPress={pickImage}
            disabled={isLoading}
          />
          {message ? (
            <MaterialCommunityIcons
              name={isLoading ? "loading" : "arrow-up-circle"}
              size={30}
              color={colors.foreground}
              onPress={handleSend}
              disabled={isLoading}
            />
          ) : (
            <Button
              className="flex flex-row gap-2 rounded-full"
              size="sm"
              disabled={isLoading}
            >
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
