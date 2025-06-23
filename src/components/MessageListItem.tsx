import { View } from "react-native";
import Markdown from "react-native-markdown-display";

import { useMarkdownStyles } from "~/lib/useMarkdownStyles";
import { cn } from "~/lib/utils";
import type { Message } from "~/types/types";

const MessageListItem = ({ messageItem }: { messageItem: Message }) => {
  const { message, role } = messageItem;
  const isUser = role === "user";
  const { markdownStyles } = useMarkdownStyles();

  return (
    <View
      className={cn(
        "mb-3 rounded-3xl px-4 py-2",
        isUser ? "max-w-[70%] self-end bg-secondary" : "self-start"
      )}
    >
      <Markdown style={markdownStyles}>{message}</Markdown>
    </View>
  );
};

export default MessageListItem;
