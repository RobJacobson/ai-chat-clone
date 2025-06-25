import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UI_CONSTANTS } from "@/lib/constants";

// Utility function for generating unique IDs
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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
  createdAt: number;
};

type ChatStore = {
  chatHistory: Chat[];
  createNewChat: (title: string) => string;
  addNewMessage: (
    chatId: string,
    message: Omit<MessageType, "id">
  ) => MessageType;
  deleteChat: (chatId: string) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatHistory: [],

      createNewChat: (message: string) => {
        const newChat: Chat = {
          id: generateId(),
          title: message.slice(0, UI_CONSTANTS.CHAT_TITLE_MAX_LENGTH),
          messages: [],
          createdAt: Date.now(),
        };

        set((state) => ({
          chatHistory: [newChat, ...state.chatHistory],
        }));

        return newChat.id;
      },

      addNewMessage: (chatId, messageWithoutId) => {
        const messageWithId: MessageType = {
          ...messageWithoutId,
          id: generateId(),
        };

        set((state) => ({
          chatHistory: state.chatHistory.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, messageWithId] }
              : chat
          ),
        }));

        return messageWithId;
      },

      deleteChat: (chatId) => {
        set((state) => ({
          chatHistory: state.chatHistory.filter((chat) => chat.id !== chatId),
        }));
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.chatHistory) {
          // Sort by creation time (newest first)
          state.chatHistory = state.chatHistory.sort(
            (a, b) => b.createdAt - a.createdAt
          );
        }
      },
    }
  )
);
