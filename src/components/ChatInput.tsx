import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useChatInputController } from "@/hooks/useChatInputController";
import { useTheme } from "@/hooks/useTheme";
import { UI_CONSTANTS } from "@/lib/constants";

import { Button } from "./ui/button";

interface ChatInputProps {
  chatId: string | null;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const {
    message,
    setMessage,
    hasMessage,
    imageBase64,
    pickImage,
    clearImage,
    handleSend,
    isLoading,
    error,
  } = useChatInputController({ chatId });

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
        {error && (
          <View className="mx-3 mt-2 rounded-md bg-red-100 p-2">
            <Text className="text-red-800 text-sm">{error}</Text>
          </View>
        )}
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
          {hasMessage ? (
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
