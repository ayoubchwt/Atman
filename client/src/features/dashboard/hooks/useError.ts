import { useErrorStore } from "../../../store/useErrorStore";

export const useError = () => {
  const errorStore = useErrorStore();
  return {
    ...errorStore,
  };
};
