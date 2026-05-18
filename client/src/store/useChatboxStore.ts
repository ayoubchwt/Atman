import { create } from "zustand";
import { getAiResponse } from "../services/NoteService";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import { useAuthStore } from "./useAuthStore";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface UseChatbox {
  messageList: Message[];
  addMessage: (noteId: string, message: Message) => Promise<void>;
  clearMessageList: () => void;
  isLoading: boolean;
}
export const useChatboxStore = create<UseChatbox>((set, get) => ({
  messageList: [],
  isLoading: false,
  addMessage: async (noteId, message): Promise<void> => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
    set({ isLoading: true });
    if (message.sender === "ai") {
      set((state) => ({
        messageList: [...state.messageList, message],
        isLoading: false,
      }));
      return;
    }
    set((state) => ({
      messageList: [...state.messageList, message],
    }));
    if (noteId) {
      try {
        const response = await getAiResponse(noteId, { prompt: message.text });
        get().addMessage(noteId, {
          id: crypto.randomUUID(),
          text: response,
          sender: "ai",
        });
      } catch (error) {
        const { setError } = useErrorStore.getState();
        setError(getErrorMessage(error));
      }
    }
  },
  clearMessageList: () => {
    set({
      messageList: [],
    });
  },
}));
