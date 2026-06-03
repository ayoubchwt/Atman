import { create } from "zustand";
import type {
  InviteNotification,
  inviteReponseDto,
  NoteInviteDto,
  UpdateInviteRoleDto,
} from "../types/shareNote";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import {
  deleteInvite,
  getInviteNotifications,
  getInvites,
  shareNote,
  updateInviteRole,
} from "../services/NoteService";

interface UseShare {
  noteInvites: inviteReponseDto[];
  inviteNotifications: InviteNotification[];
  shareNote: (dto: NoteInviteDto) => Promise<void>;
  fetchNoteInvites: (noteId: string) => Promise<void>;
  fetchInviteNotification: () => Promise<void>;
  updateInviteRole: (updateInviteRoleDto: UpdateInviteRoleDto) => Promise<void>;
  deleteInvite: (noteId: string) => Promise<void>;
}
export const useShareStore = create<UseShare>((set) => ({
  noteInvites: [],
  inviteNotifications: [],
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
  fetchInviteNotification: async () => {
    try {
      const result = await getInviteNotifications();
      set({
        inviteNotifications: result,
      });
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
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
