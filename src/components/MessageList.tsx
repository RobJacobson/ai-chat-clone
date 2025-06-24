import { useEffect, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";

import type { Message } from "~/store/chatStore";

import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("scrolling to end");
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

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
