import { FlatList } from "react-native-gesture-handler";

import type { Message } from "~/types/types";

import MessageListItem from "./MessageListItem";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageListItem messageItem={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MessageList;
