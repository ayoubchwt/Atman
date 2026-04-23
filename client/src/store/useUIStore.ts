import { create } from "zustand";

interface useUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isFolderView: boolean;
  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<useUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isFolderView: false,

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
  closeAll: () => {
    set({
      isSideBarOpen: false,
      isNavOpen: false,
    });
  },
}));
