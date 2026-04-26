import { create } from "zustand";

interface UseUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isFolderView: boolean;
  isAddingFolder: boolean;
  isUpdatingFolder: boolean;
  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setAddingFolder: (state: boolean) => void;
  setUpdatingFolder: (state: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<UseUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isFolderView: false,
  isAddingFolder: false,
  isUpdatingFolder: false,

  setSideBarOpen: (open) => {
    set({
      isSideBarOpen: open,
    });
  },
  setNavOpen: (open) => {
    set({
      isNavOpen: open,
    });
  },
  setFolderView: (state) => {
    set({
      isFolderView: state,
    });
  },
  setAddingFolder: (state): void => {
    set({
      isAddingFolder: state,
    });
  },
  setUpdatingFolder: (state): void => {
    set({
      isUpdatingFolder: state,
    });
  },
  closeAll: () => {
    set({
      isSideBarOpen: false,
      isNavOpen: false,
    });
  },
}));
