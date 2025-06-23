import { View } from "react-native";

import { cn } from "~/lib/utils";

import { Text } from "./ui/text";

export type MessageType = {
  message: string;
  role: "user" | "assistant";
  id: string;
};

const MessageListItem = ({ messageItem }: { messageItem: MessageType }) => {
  const { message, role } = messageItem;
  const isUser = role === "user";

  return (
    <View
      className={cn(
        "mb-3 rounded-3xl px-4 py-2",
        isUser ? "max-w-[70%] self-end bg-secondary" : "self-start"
      )}
    >
      <Text>{message}</Text>
    </View>
  );
};

export default MessageListItem;
