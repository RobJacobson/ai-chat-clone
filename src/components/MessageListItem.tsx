import { Image, View } from "react-native";
import Markdown from "react-native-markdown-display";

import { useMarkdownStyles } from "~/hooks/useMarkdownStyles";
import { cn } from "~/lib/utils";
import type { MessageType } from "~/store/chatStore";

const MessageListItem = ({ messageItem }: { messageItem: MessageType }) => {
  const { message, role, image } = messageItem;
  const isUser = role === "user";
  const { markdownStyles } = useMarkdownStyles();

  return (
    <View className={cn("mb-3 px-2", isUser && "items-end")}>
      {image && (
        <Image source={{ uri: image }} className="mb-2 h-40 w-40 rounded-lg" style={{ width: 160, height: 160, borderRadius: 8 }} />
      )}
      <View
        className={cn(
          "rounded-3xl px-4 py-2",
          isUser && "max-w-[70%] bg-secondary"
        )}
      >
        <Markdown style={markdownStyles}>{message}</Markdown>
      </View>
    </View>
  );
};

export default MessageListItem;
