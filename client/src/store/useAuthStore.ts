import { create } from "zustand";
import {
  login,
  register,
  refresh,
  logout,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../services/AuthService";

import type { LoginRequestDto, registerRequestDto } from "../types/Auth";
import api from "../api/Axios";
import { getErrorMessage } from "../utils/getError";

interface AuthState {
  user: { name: string; email: string; accessToken?: string } | null;
  recovery: {
    email: string | null;
    code?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  handleLogin: (loginRequest: LoginRequestDto) => Promise<boolean>;
  handleRegister: (registerRequest: registerRequestDto) => Promise<boolean>;
  handleRefresh: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<void>;
  resetStatus: () => void;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  recovery: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,

  handleLogin: async (loginRequest: LoginRequestDto): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const result = await login(loginRequest);
      set({
        user: {
          name: result.name,
          email: result.email,
          accessToken: result.accessToken,
        },
        isLoading: false,
        isAuthenticated: true,
      });
      return true;
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
      return false;
    }
  },

  handleRegister: async (
    registerRequest: registerRequestDto,
  ): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const result = await register(registerRequest);
      set({
        user: { name: result.name, email: result.email },
        isLoading: false,
        message: `User ${registerRequest.email} registered successfully.`,
      });
      return true;
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false,
      });
      return false;
    }
  },

  handleRefresh: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      const result = await refresh();
      set({
        user: {
          name: result.name,
          email: result.email,
          accessToken: result.accessToken,
        },
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      set({ isAuthenticated: false, isLoading: false, user: null });
    }
  },

  logout: async () => {
    delete api.defaults.headers.common["Authorization"];
    set({ isAuthenticated: false, user: null, error: null, isLoading: false });
    try {
      await logout();
    } catch (error) {
      console.log("Backend logout failed, session cleared locally", error);
    }
  },

  forgotPassword: async (email): Promise<boolean> => {
    set({ isLoading: true });
    try {
      await forgotPassword({ email: email });
      set((state) => ({
        isLoading: false,
        recovery: { ...state.recovery, email },
        message: `If an account with that email ${email} exists, a reset code has been sent.`,
      }));
      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      return false;
    }
  },

  verifyOtp: async (code: string): Promise<boolean> => {
    set({ isLoading: true });
    try {
      const recovery = get().recovery;
      if (!recovery?.email) return false;
      await verifyOtp({ code: code, email: recovery.email });
      set({
        isLoading: false,
        recovery: { ...recovery, code: code },
      });
      return true;
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      return false;
    }
  },

  resetPassword: async (password: string): Promise<void> => {
    set({ isLoading: true });
    try {
      const recovery = get().recovery;
      if (!recovery?.email || !recovery?.code) return;
      await resetPassword({
        email: recovery.email,
        code: recovery.code,
        newPassword: password,
      });
      set({
        message: `Your password has been reset successfully.`,
        recovery: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },
  resetStatus: () => {
    set({
      message: null,
      error: null,
    });
  },
}));
