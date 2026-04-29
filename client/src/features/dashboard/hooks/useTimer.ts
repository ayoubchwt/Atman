import { useTimerStore } from "../../../store/useTimerStore";
import { useUIStore } from "../../../store/useUIStore";

export const useTimer = () => {
  const uiStore = useUIStore();
  const timerStore = useTimerStore();

  return {
    ...uiStore,
    ...timerStore,
  };
};
