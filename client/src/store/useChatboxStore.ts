import { create } from "zustand";
import { getAiResponse } from "../services/NoteService";

interface Message {
  text: string;
  sender: "user" | "ai";
}

interface UseChatbox {
  messageList: Message[];
  addMessage: (noteId: string, message: Message) => Promise<void>;
}
export const useChatboxStore = create<UseChatbox>((set, get) => ({
  messageList: [],
  addMessage: async (noteId, message): Promise<void> => {
    if (message.sender === "ai") {
      set((state) => ({
        messageList: [...state.messageList, message],
      }));
      return;
    }
    set((state) => ({
      messageList: [...state.messageList, message],
    }));
    if (noteId) {
      const response = await getAiResponse(noteId, { prompt: message.text });
      get().addMessage(noteId, { text: response, sender: "ai" });
    }
  },
}));
