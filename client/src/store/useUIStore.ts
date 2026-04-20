import { create } from "zustand";

interface useUI {
  isSideBarOpen: boolean;
  isNavOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
  setNavOpen: (open: boolean) => void;
  closeAll: () => void;
}
export const useUIStore = create<useUI>((set) => ({
  isSideBarOpen: false,
  isNavOpen: false,
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
  closeAll: () => {
    set({
      isSideBarOpen: false,
      isNavOpen: false,
    });
  },
}));
