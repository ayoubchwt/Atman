import { create } from "zustand";

interface UseUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isTimerOpen: boolean;
  isChatboxOpen: boolean;
  isFolderView: boolean;
  isAddingFolder: boolean;

  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setTimerOpen: (open: boolean) => void;
  setChatboxOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setAddingFolder: (state: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<UseUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isTimerOpen: false,
  isChatboxOpen: false,
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
  setTimerOpen: (open) => {
    set({
      isTimerOpen: open,
    });
  },
  setChatboxOpen: (open) => {
    set({
      isChatboxOpen: open,
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
