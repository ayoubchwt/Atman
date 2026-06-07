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
  getSharedNotes,
  getSharedWith,
  removeCollaborator,
  shareNote,
  updateInviteRole,
  updateInviteStatus,
} from "../services/NoteService";
import type { NoteResponseDto } from "../types/Note";
import { useAuthStore } from "./useAuthStore";
import { useUserStore } from "./useUserStore";

interface UseShare {
  noteInvites: inviteReponseDto[];
  inviteNotifications: InviteNotification[];
  collaborators: SharedUserResponseDto[];
  role: "editor" | "viewer" | "owner" | null;
  sharedNotes: NoteResponseDto[];
  activeSharedNoteId: string | null;
  shareNote: (dto: NoteInviteDto) => Promise<void>;
  fetchNoteInvites: (noteId: string) => Promise<void>;
  fetchInviteNotification: () => Promise<void>;
  fetchCollaborators: (noteId: string) => Promise<void>;
  fetchSharedNotes: () => Promise<void>;
  updateInviteRole: (dto: UpdateInviteRoleDto) => Promise<void>;
  updateInviteStatus: (dto: UpdateInviteStatusDto) => Promise<void>;
  deleteInvite: (noteId: string) => Promise<void>;
  removeCollaborator: (dto: RemoveCollaboratorDto) => Promise<void>;
  setActiveSharedNote: (noteId: string) => void;
  checkRole: () => void;
}
export const useShareStore = create<UseShare>((set, get) => ({
  noteInvites: [],
  inviteNotifications: [],
  collaborators: [],
  sharedNotes: [],
  activeSharedNoteId: null,
  role: "owner",
  shareNote: async (dto) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
    try {
      await shareNote(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
  fetchNoteInvites: async (noteId: string) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
  fetchSharedNotes: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
    try {
      const result = await getSharedNotes();
      set({
        sharedNotes: result,
      });
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
  updateInviteRole: async (dto: UpdateInviteRoleDto) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
    try {
      await updateInviteRole(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
      throw error;
    }
  },
  updateInviteStatus: async (dto: UpdateInviteStatusDto) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (!isAuthenticated) return;
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
  setActiveSharedNote: (noteId: string) => {
    set({
      activeSharedNoteId: noteId,
    });
  },
  checkRole: () => {
    const collaborators = get().collaborators;
    const id = useUserStore.getState().user?.id;
    const myRecord = collaborators.find(
      (collaborator) => collaborator.userId === id,
    );
    set({
      role: myRecord?.role || null,
    });
  },
}));
