import { create } from "zustand";
import type { createFolderDto, FolderResponseDto } from "../types/Folder";
import { useAuthStore } from "./useAuthStore";
import { addFolder, getFolders } from "../services/FolderService";
import type { NoteResponseDto } from "../types/Note";
import { getNotesByFolder } from "../services/NoteService";

interface FolderState {
  folders: FolderResponseDto[];
  folderNotes: NoteResponseDto[];
  activeFolderId: string | null;
  setActiveFolderId: (id: string) => void;
  fetchFolders: () => Promise<void>;
  FetchFolderNotes: (folderId: string) => Promise<void>;
  addFolder: (dto: createFolderDto) => Promise<void>;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  folderNotes: [],
  activeFolderId: null,
  setActiveFolderId: (id): void => {
    set({
      activeFolderId: id,
    });
  },
  fetchFolders: async (): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const result = await getFolders();
      set({
        folders: result,
      });
    } catch (error) {
      console.log("error fetching folders", error);
    }
  },
  FetchFolderNotes: async (folderId): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const result = await getNotesByFolder(folderId);
      set({
        folderNotes: result,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addFolder: async (dto): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      const savedFolder = await addFolder(dto);
      set((state) => ({
        folders: [savedFolder, ...state.folders],
        activeFolderId: savedFolder.id,
      }));
    } catch (error) {
      console.log("error adding folder", error);
    }
  },
}));
