import { create } from "zustand";
import { useUserStore } from "./useUserStore";

const alarmSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/bip.mp3") : null;

interface UseTimer {
  selectedMode: "focus" | "short" | "long";
  timeLeft: number;
  interval: ReturnType<typeof setInterval> | undefined;
  isRunning: boolean;
  durations: Record<string, number>;
  setSelectedMode: (mode: "focus" | "short" | "long") => void;
  setIsRunning: (running: boolean) => void;
  resetTimer: () => void;
}
export const useTimerStore = create<UseTimer>((set, get) => ({
  selectedMode: "focus",
  timeLeft: 1500,
  sessions: 0,
  isRunning: false,
  interval: undefined,
  durations: { focus: 1500, short: 300, long: 900 },
  setSelectedMode: (mode): void => {
    const { durations, interval } = get();
    if (interval) clearInterval(interval);
    set({
      selectedMode: mode,
      timeLeft: durations[mode],
      interval: undefined,
      isRunning: false,
    });
  },
  setIsRunning: (running): void => {
    const { interval } = get();
    if (interval) clearInterval(interval);
    if (running) {
      const id = setInterval(async () => {
        const { timeLeft, selectedMode } = get();
        if (timeLeft > 0) set({ timeLeft: timeLeft - 1 });
        else {
          clearInterval(id);
          get().resetTimer();
          if (alarmSound) alarmSound.play();
          if (selectedMode === "focus")
            await useUserStore.getState().incrementSessions();
        }
      }, 1);
      set({ interval: id, isRunning: true });
    } else {
      set({
        isRunning: false,
      });
    }
  },
  resetTimer: (): void => {
    const { selectedMode, durations, interval } = get();
    if (interval) clearInterval(interval);
    set({
      isRunning: false,
      timeLeft: durations[selectedMode],
      interval: undefined,
    });
  },
}));
