export type Message = {
  id: string;
  role: "user" | "assistant";
  message: string;
  responseId?: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
