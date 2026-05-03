import { create } from "zustand";
import type { userResponseDto } from "../types/User";
import { getUser, incrementSessions } from "../services/UserService";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";

interface UseUser {
  user: userResponseDto | null;
  fetchUser: () => Promise<void>;
  incrementSessions: () => Promise<void>;
}
export const useUserStore = create<UseUser>((set, get) => ({
  user: null,
  fetchUser: async (): Promise<void> => {
    try {
      const response = await getUser();
      set({
        user: response,
      });
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
  incrementSessions: async (): Promise<void> => {
    try {
      const currentUser = get().user;
      if (currentUser) {
        await incrementSessions();
        set({
          user: {
            ...currentUser,
            sessions: (currentUser.sessions || 0) + 1,
          },
        });
      }
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
}));
