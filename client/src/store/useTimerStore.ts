import { create } from "zustand";

interface useTimer {
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}
export const useTimerStore = create<useTimer>((set) => ({
  selectedMode: "focus",
  setSelectedMode: (mode: string): void => {
    set({
      selectedMode: mode,
    });
  },
}));
