import { create } from "zustand";
import type { createFolderDto, FolderResponseDto } from "../types/Folder";
import { useAuthStore } from "./useAuthStore";
import { addFolder, getFolders } from "../services/FolderService";

interface FolderState {
  folders: FolderResponseDto[];
  activeFolderId: string | null;
  setActiveFolderId: (id: string) => void;
  fetchFolders: () => Promise<void>;
  addFolder: (dto: createFolderDto) => Promise<void>;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
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
