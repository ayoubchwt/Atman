import { create } from "zustand";
import type {
  inviteReponseDto,
  NoteInviteDto,
  UpdateInviteRoleDto,
} from "../types/shareNote";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import {
  deleteInvite,
  getInvites,
  shareNote,
  updateInviteRole,
} from "../services/NoteService";

interface UseShare {
  noteInvites: inviteReponseDto[];
  shareNote: (dto: NoteInviteDto) => Promise<void>;
  fetchNoteInvites: (noteId: string) => Promise<void>;
  updateInviteRole: (updateInviteRoleDto: UpdateInviteRoleDto) => Promise<void>;
  deleteInvite: (noteId: string) => Promise<void>;
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
  updateInviteRole: async (dto: UpdateInviteRoleDto) => {
    try {
      await updateInviteRole(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
  deleteInvite: async (inviteId: string) => {
    try {
      await deleteInvite(inviteId);
      set((state) => ({
        noteInvites: state.noteInvites.filter(
          (invite) => invite.id !== inviteId,
        ),
      }));
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
}));
