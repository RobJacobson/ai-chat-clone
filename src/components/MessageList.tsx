import { useEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

import type { MessageType } from "~/store/chatStore";

import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: MessageType[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
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
