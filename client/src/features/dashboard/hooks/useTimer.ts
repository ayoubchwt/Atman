import { useTimerStore } from "../../../store/useTimerStore";
import { useUIStore } from "../../../store/useUIStore";

export const useTimer = () => {
  const uiStore = useUIStore();
  const timerStore = useTimerStore();

  const formatTime = () => {
    const timeLeft = timerStore.timeLeft;
    const minutes = Math.floor(timeLeft / 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const seconds = (timeLeft % 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return { minutes, seconds };
  };
  return {
    ...uiStore,
    ...timerStore,
    formatTime,
  };
};
