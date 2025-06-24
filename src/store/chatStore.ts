import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  message: string;
  image?: string;
  responseId?: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: MessageType[];
};

type ChatStore = {
  chatHistory: Chat[];
  createNewChat: (title: string) => string;
  addNewMessage: (
    chatId: string,
    message: Omit<MessageType, "id">
  ) => MessageType;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],

      createNewChat: (message: string) => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title: message.slice(0, 50),
          messages: [],
        };

        set((state) => ({ chatHistory: [newChat, ...state.chatHistory] }));

        return newChat.id;
      },

      addNewMessage: (chatId, messageWithoutId) => {
        const messageWithId: MessageType = {
          ...messageWithoutId,
          id: Date.now().toString(),
        };

        set((state) => ({
          chatHistory: state.chatHistory.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...(chat.messages ?? []), messageWithId] }
              : chat
          ),
        }));

        return messageWithId;
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.chatHistory) {
          // Sort by numeric value of id (since id is a string)
          state.chatHistory = state.chatHistory.sort(
            (a, b) => Number(b.id) - Number(a.id)
          );
        }
      },
    }
  )
);
