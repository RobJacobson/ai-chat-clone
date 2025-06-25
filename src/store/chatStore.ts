import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UI_CONSTANTS } from "@/lib/constants";

// Utility function for generating unique IDs
let idCounter = 0;
const generateId = () => `id-${++idCounter}-${Date.now()}`;

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  message?: string;
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
  isWaitingForResponse: boolean;
  setIsWaitingForResponse: (isWaiting: boolean) => void;
  createNewChat: (title: string) => string;
  addNewMessage: (
    chatId: string,
    message: Omit<MessageType, "id">
  ) => MessageType;
  deleteChat: (chatId: string) => void;
  clearAllData: () => Promise<void>;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],
      isWaitingForResponse: false,

      setIsWaitingForResponse: (isWaitingForResponse: boolean) => {
        set({ isWaitingForResponse });
      },

      createNewChat: (message: string) => {
        const newChat: Chat = {
          id: generateId(),
          title: message.slice(0, UI_CONSTANTS.CHAT_TITLE_MAX_LENGTH),
          messages: [],
          createdAt: Date.now(),
        };

        set((state) => ({
          chatHistory: [newChat, ...state.chatHistory].sort(
            (a, b) => b.createdAt - a.createdAt
          ),
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

      clearAllData: async () => {
        // Clear the store state
        set({ chatHistory: [], isWaitingForResponse: false });
        // Clear AsyncStorage
        await AsyncStorage.removeItem("chat-storage");
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
