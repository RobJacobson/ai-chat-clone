import { useEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

import type { Message } from "~/types/types";

import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages.length]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={({ item }) => <MessageListItem messageItem={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MessageList;
