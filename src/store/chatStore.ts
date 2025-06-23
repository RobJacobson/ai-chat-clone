import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Chat, Message } from "~/types/types";

type ChatStore = {
  chatHistory: Chat[];
  createNewChat: (title: string) => string;
  addNewMessage: (chatId: string, message: Message) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],

      createNewChat: (title: string) => {
        const newChat: Chat = {
          id: Date.now().toString(),
          title,
          messages: [],
        };

        set((state) => ({ chatHistory: [newChat, ...state.chatHistory] }));

        return newChat.id;
      },

      addNewMessage: (chatId, message) => {
        set((state) => ({
          chatHistory: state.chatHistory.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...(chat.messages ?? []), message] }
              : chat
          ),
        }));
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
