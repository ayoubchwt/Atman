import { create } from "zustand";
import type { NoteInviteDto } from "../types/shareNote";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import { shareNote } from "../services/NoteService";

interface UseShare {
  shareNote: (dto: NoteInviteDto) => Promise<void>;
}
export const useShareStore = create<UseShare>(() => ({
  shareNote: async (dto) => {
    try {
      await shareNote(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
}));
