import { create } from "zustand";
import type {
  CreateFolderDto,
  FolderResponseDto,
  UpdateFolderDto,
} from "../types/Folder";
import { useAuthStore } from "./useAuthStore";
import {
  addFolder,
  deleteFolder,
  getFolders,
  updateFolder,
} from "../services/FolderService";
import type { NoteResponseDto } from "../types/Note";
import { getNotesByFolder } from "../services/NoteService";

interface FolderState {
  folders: FolderResponseDto[];
  folderNotes: NoteResponseDto[];
  activeFolderId: string | null;
  updatingFolderId: string | null;
  extendedFolderId: string | null;
  setActiveFolderId: (id: string) => void;
  setUpdatingFolderId: (id: string | null) => void;
  setExtendedFolderId: (id: string | null) => Promise<void>;
  fetchFolders: () => Promise<void>;
  FetchFolderNotes: (id: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  addFolder: (dto: CreateFolderDto) => Promise<void>;
  updateFolder: (id: string, dto: UpdateFolderDto) => Promise<void>;
  clearFolderStore: () => void;
}

export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],
  folderNotes: [],
  activeFolderId: null,
  updatingFolderId: null,
  extendedFolderId: null,
  setActiveFolderId: (id): void => {
    set({
      activeFolderId: id,
    });
  },
  setUpdatingFolderId: (id): void => {
    set({
      updatingFolderId: id,
    });
  },
  setExtendedFolderId: async (id): Promise<void> => {
    const currentId = get().extendedFolderId;
    if (id === currentId || id === null) {
      set({
        extendedFolderId: null,
        folderNotes: [],
      });
    } else {
      try {
        await get().FetchFolderNotes(id);
        set({
          extendedFolderId: id,
        });
      } catch (error) {
        console.log(error);
      }
    }
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
  FetchFolderNotes: async (id): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (!isAuthenticated) return;
    try {
      if (id) {
        const result = await getNotesByFolder(id);
        set({
          folderNotes: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteFolder: async (id): Promise<void> => {
    set((state) => {
      const updatedFolders = state.folders.filter((folder) => folder.id !== id);
      return {
        folders: updatedFolders,
      };
    });
    const isAuthenticated = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        await deleteFolder(id);
      } catch (error) {
        console.log("error deleting folder", error);
      }
    }
  },
  addFolder: async (dto): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        const savedFolder = await addFolder(dto);
        set((state) => ({
          folders: [savedFolder, ...state.folders],
          activeFolderId: savedFolder.id,
        }));
        return;
      } catch (error) {
        console.log("error adding folder", error);
        return;
      }
    }
    const newFolder: FolderResponseDto = {
      id: crypto.randomUUID(),
      label: dto.label,
    };
    set((state) => ({
      folders: [newFolder, ...state.folders],
      activeFolderId: newFolder.id,
    }));
  },
  updateFolder: async (id: string, dto: UpdateFolderDto): Promise<void> => {
    const isAuthenticated = useAuthStore.getState();
    if (isAuthenticated) {
      try {
        const result = await updateFolder(id, dto);
        set((state) => ({
          folders: state.folders.map((folder) =>
            folder.id === result.id ? { ...folder, ...result } : folder,
          ),
        }));
        return;
      } catch (error) {
        console.log(error);
      }
    }
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === id ? { ...folder, ...dto } : folder,
      ),
    }));
  },
  clearFolderStore: (): void => {
    set({
      folders: [],
      folderNotes: [],
      activeFolderId: null,
    });
  },
}));
