import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { type MessageType, useChatStore } from "@/store/chatStore";

import MessageListItem from "./MessageListItem";
import { Text } from "./ui/text";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const isWaitingForResponse = useChatStore(
    (state) => state.isWaitingForResponse
  );
  const flatListRef = useScrollToBottom(messages.length);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => <MessageListItem messageItem={item} />}
      keyExtractor={(item) => item.id}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      ListFooterComponent={() =>
        isWaitingForResponse && (
          <Text className="p-6 text-gray-500">Waiting for response...</Text>
        )
      }
    />
  );
};

export default MessageList;
