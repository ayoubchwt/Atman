import { create } from "zustand";

interface UseUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isTimerOpen: boolean;
  isChatboxOpen: boolean;
  isShareOpen: boolean;
  isFolderView: boolean;
  isAddingFolder: boolean;

  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setTimerOpen: (open: boolean) => void;
  setChatboxOpen: (open: boolean) => void;
  setShareOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setAddingFolder: (state: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<UseUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isTimerOpen: false,
  isChatboxOpen: false,
  isShareOpen: false,
  isNotificationOpen: false,
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
  setShareOpen: (open) => {
    set({
      isShareOpen: open,
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
