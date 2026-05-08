import { create } from "zustand";
import type {
  UpdateUserDto,
  UserResponseDto,
  UserSettingsResponseDto,
} from "../types/User";
import {
  getUser,
  getUserSettings,
  incrementSessions,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
} from "../services/UserService";
import { useErrorStore } from "./useErrorStore";
import { getErrorMessage } from "../utils/getError";

interface UseUser {
  user: UserResponseDto | null;
  userSettings: UserSettingsResponseDto | null;
  fetchUser: () => Promise<void>;
  fetchUserSettings: () => Promise<void>;
  incrementSessions: () => Promise<void>;
  updateUserName: (dto: UpdateUserDto) => Promise<void>;
  updateUserEmail: (dto: UpdateUserDto) => Promise<void>;
  updateUserPassword: (dto: UpdateUserDto) => Promise<void>;
}
export const useUserStore = create<UseUser>((set, get) => ({
  user: null,
  userSettings: null,
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
  fetchUserSettings: async () => {
    try {
      const response = await getUserSettings();
      set({
        userSettings: response,
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
  updateUserName: async (dto) => {
    try {
      await updateUserName(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
  updateUserEmail: async (dto) => {
    try {
      await updateUserEmail(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
  updateUserPassword: async (dto) => {
    try {
      await updateUserPassword(dto);
    } catch (error) {
      const { setError } = useErrorStore.getState();
      setError(getErrorMessage(error));
    }
  },
}));
