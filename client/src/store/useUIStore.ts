import { create } from "zustand";

interface UseUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isFolderView: boolean;
  isAddingFolder: boolean;
  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setAddingFolder: (state: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<UseUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isFolderView: false,
  isAddingFolder: false,

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
  closeAll: () => {
    set({
      isSideBarOpen: false,
      isNavOpen: false,
    });
  },
}));
