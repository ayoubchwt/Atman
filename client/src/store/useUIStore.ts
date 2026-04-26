import { create } from "zustand";

interface useUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  isFolderView: boolean;
  isAddingFolder: boolean;
  isModifyingFolder: boolean;
  setFolderView: (state: boolean) => void;
  setSideBarOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  setAddingFolder: (state: boolean) => void;
  setModifyingFolder: (state: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<useUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
  isFolderView: false,
  isAddingFolder: false,
  isModifyingFolder: false,

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
  setModifyingFolder: (state): void => {
    set({
      isModifyingFolder: state,
    });
  },
  closeAll: () => {
    set({
      isSideBarOpen: false,
      isNavOpen: false,
    });
  },
}));
