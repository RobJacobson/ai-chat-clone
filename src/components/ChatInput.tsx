import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "~/hooks/useTheme";

import { Button } from "./ui/button";

const ChatInput = ({
  onSend,
  isLoading,
}: {
  onSend: (message: string) => Promise<void>;
  isLoading: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState("");
  const { colors } = useTheme();

  const handleSend = async () => {
    if (!message.trim()) return;

    const messageToSend = message;
    setMessage("");
    try {
      await onSend(messageToSend);
    } catch (error) {
      console.log(error);
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
