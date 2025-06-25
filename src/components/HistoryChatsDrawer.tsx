// import chatHistory from "@assets/data/chatHistory.json";
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";

import { useChatStore } from "@/store/chatStore";

const HistoryChatsDrawer = (props: DrawerContentComponentProps) => {
  const pathname = usePathname();
  const chatHistory = useChatStore((state) => state.chatHistory);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {chatHistory.map((chat) => (
        <DrawerItem
          key={chat.id}
          label={chat.title}
          inactiveTintColor="gray"
          focused={pathname === `/chat/${chat.id}`}
          onPress={() => router.push(`/chat/${chat.id}`)}
        />
      ))}
    </DrawerContentScrollView>
  );
};

export default HistoryChatsDrawer;
