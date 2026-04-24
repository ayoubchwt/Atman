import { create } from "zustand";
import type { createFolderDto, FolderResponseDto } from "../types/Folder";
import { useAuthStore } from "./useAuthStore";
import { addFolder, getFolders } from "../services/FolderService";

interface FolderState {
  folders: FolderResponseDto[];
  activeFolder: string | null;
  fetchFolders: () => void;
  addFolder: (dto: createFolderDto) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  activeFolder: null,
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
        activeFolder: state.folders[0].id,
      }));
    } catch (error) {
      console.log("error adding folder", error);
    }
  },
}));
