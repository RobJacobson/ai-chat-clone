import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
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

import { useChatMessage } from "@/hooks/useChatMessage";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useTheme } from "@/hooks/useTheme";
import { UI_CONSTANTS } from "@/lib/constants";
import { useChatStore } from "@/store/chatStore";
import { useChatOperations } from "~/hooks/useChatOperations";

import { Button } from "./ui/button";

interface ChatInputProps {
  chatId?: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Use hooks directly
  const { message, setMessage, clearMessage, hasMessage } = useChatMessage();
  const { imageBase64, pickImage, clearImage } = useImagePicker();
  const { sendMessage } = useChatOperations();
  const isWaitingForResponse = useChatStore(
    (state) => state.isWaitingForResponse
  );

  const clearInput = () => {
    clearMessage();
    clearImage();
  };

  const handleSend = async () => {
    await sendMessage({ message, imageBase64, chatId }, isGeneratingImage);
    clearInput();
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
              onPress={clearImage}
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
          editable={!isWaitingForResponse}
        />
        <View className="m-2 flex-row items-center gap-4">
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={colors.foreground}
            onPress={pickImage}
            disabled={isWaitingForResponse}
          />
          <MaterialCommunityIcons
            name="palette"
            size={24}
            color={
              isGeneratingImage ? colors.foreground : colors.mutedForeground
            }
            onPress={() => setIsGeneratingImage(!isGeneratingImage)}
            disabled={isWaitingForResponse}
          />
          {hasMessage ? (
            <MaterialCommunityIcons
              name={isWaitingForResponse ? "loading" : "arrow-up-circle"}
              size={30}
              color={colors.foreground}
              onPress={handleSend}
              disabled={isWaitingForResponse}
              className="ml-auto"
            />
          ) : (
            <Button
              className="ml-auto flex flex-row gap-2 rounded-full"
              size="sm"
              disabled={isWaitingForResponse}
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
