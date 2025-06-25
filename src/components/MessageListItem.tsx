import { Image, View } from "react-native";
import Markdown from "react-native-markdown-display";

import { useMarkdownStyles } from "@/hooks/useMarkdownStyles";
import { UI_CONSTANTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { MessageType } from "@/store/chatStore";

interface MessageListItemProps {
  messageItem: MessageType;
}

const MessageListItem = ({ messageItem }: MessageListItemProps) => {
  const { message, role, image } = messageItem;
  const isUser = role === "user";
  const { markdownStyles } = useMarkdownStyles();

  return (
    <View className={cn("mb-3 px-2", isUser && "items-end")}>
      {image && (
        <Image
          source={{ uri: image }}
          className="mb-2 rounded-lg"
          style={{
            width: UI_CONSTANTS.IMAGE_SIZE,
            height: UI_CONSTANTS.IMAGE_SIZE,
          }}
          resizeMode="cover"
        />
      )}
      <View
        className={cn(
          "rounded-3xl px-4 py-2",
          isUser ? "max-w-[70%] bg-secondary" : "max-w-[85%]"
        )}
      >
        <Markdown style={markdownStyles}>{message}</Markdown>
      </View>
    </View>
  );
};

export default MessageListItem;
