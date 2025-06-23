import { create } from "zustand";

import type { Chat, Message } from "~/types/types";

type ChatStore = {
  chatHistory: Chat[];
  createNewChat: (title: string) => string;
  addNewMessage: (chatId: string, message: Message) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
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
}));
