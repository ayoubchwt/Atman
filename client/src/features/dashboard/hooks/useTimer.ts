import { useUIStore } from "../../../store/useUIStore";

export const useTimer = () => {
  const uiStore = useUIStore();

  return {
    ...uiStore,
  };
};
