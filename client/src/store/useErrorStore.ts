import { create } from "zustand";

interface UseError {
  error: string | null;
  setError: (error: string | null) => void;
}
export const useErrorStore = create<UseError>((set) => ({
  error: null,
  setError: (error) => {
    set({
      error: error,
    });
  },
}));
