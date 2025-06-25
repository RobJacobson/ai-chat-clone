import { useCallback, useEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

import { UI_CONSTANTS } from "@/lib/constants";
import type { MessageType } from "@/store/chatStore";

import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const flatListRef = useRef<FlatList>(null);

  // Memoized render function for better performance
  const renderMessage = useCallback(
    ({ item }: { item: MessageType }) => <MessageListItem messageItem={item} />,
    []
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: MessageType) => item.id, []);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, UI_CONSTANTS.SCROLL_DELAY);

      return () => clearTimeout(timer);
    }
  }, [messages.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={keyExtractor}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={10}
      getItemLayout={(data, index) => ({
        length: 100, // Approximate item height
        offset: 100 * index,
        index,
      })}
    />
  );
};

export default MessageList;
