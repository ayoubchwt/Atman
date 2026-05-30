import { create } from "zustand";
import type { inviteReponseDto, NoteInviteDto } from "../types/shareNote";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import { getInvites, shareNote } from "../services/NoteService";

interface UseShare {
  noteInvites: inviteReponseDto[];
  shareNote: (dto: NoteInviteDto) => Promise<void>;
  fetchNoteInvites: (noteId: string) => Promise<void>;
}
export const useShareStore = create<UseShare>((set) => ({
  noteInvites: [],
  shareNote: async (dto) => {
    try {
      await shareNote(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
  fetchNoteInvites: async (noteId: string) => {
    try {
      const result = await getInvites(noteId);
      set({
        noteInvites: result,
      });
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
}));
