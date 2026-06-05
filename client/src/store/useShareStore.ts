import { create } from "zustand";
import type {
  InviteNotification,
  inviteReponseDto,
  NoteInviteDto,
  RemoveCollaboratorDto,
  SharedUserResponseDto,
  UpdateInviteRoleDto,
  UpdateInviteStatusDto,
} from "../types/shareNote";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";
import {
  deleteInvite,
  getInviteNotifications,
  getInvites,
  getSharedWith,
  removeCollaborator,
  shareNote,
  updateInviteRole,
  updateInviteStatus,
} from "../services/NoteService";

interface UseShare {
  noteInvites: inviteReponseDto[];
  inviteNotifications: InviteNotification[];
  collaborators: SharedUserResponseDto[];
  shareNote: (dto: NoteInviteDto) => Promise<void>;
  fetchNoteInvites: (noteId: string) => Promise<void>;
  fetchInviteNotification: () => Promise<void>;
  fetchCollaborators: (noteId: string) => Promise<void>;
  updateInviteRole: (dto: UpdateInviteRoleDto) => Promise<void>;
  updateInviteStatus: (dto: UpdateInviteStatusDto) => Promise<void>;
  deleteInvite: (noteId: string) => Promise<void>;
  removeCollaborator: (dto: RemoveCollaboratorDto) => Promise<void>;
}
export const useShareStore = create<UseShare>((set) => ({
  noteInvites: [],
  inviteNotifications: [],
  collaborators: [],
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
  fetchCollaborators: async (noteId: string) => {
    try {
      const result = await getSharedWith(noteId);
      set({
        collaborators: result,
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
  updateInviteStatus: async (dto: UpdateInviteStatusDto) => {
    try {
      await updateInviteStatus(dto);
      set((state) => ({
        inviteNotifications: state.inviteNotifications.filter(
          (item) => item.id !== dto.id,
        ),
      }));
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
      throw error;
    }
  },
  removeCollaborator: async (dto: RemoveCollaboratorDto) => {
    try {
      await removeCollaborator(dto);
      set((state) => ({
        collaborators: state.collaborators.filter(
          (collaborator) => collaborator.userId !== dto.guestId,
        ),
      }));
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
}));
