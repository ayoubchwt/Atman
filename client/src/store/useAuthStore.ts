import { create } from "zustand";
import { AxiosError } from "axios";
import {
  login,
  register,
  refresh,
  logout,
  forgotPassword,
  verifyOtp,
} from "../services/AuthService";
import type { LoginRequest, registerRequest } from "../types/Auth";
import api from "../api/Axios";
interface AuthState {
  user: { name: string; email: string; accessToken?: string } | null;
  recovery: { email: string | null; isOtpVerified: boolean } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  handleLogin: (loginRequest: LoginRequest) => Promise<boolean>;
  handleRegister: (registerRequest: registerRequest) => Promise<boolean>;
  handleRefresh: () => Promise<boolean>;
  logout: () => void;
  ForgotPassword: (email: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<boolean>;
  setRecoveryEmail: (email: string) => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
  resetStatus: () => void;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  recovery: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  message: null,
  handleLogin: async (loginRequest: LoginRequest): Promise<boolean> => {
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
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      set({
        error: axiosError.response?.data?.message || "Log in Failed",
        isLoading: false,
      });
      return false;
    }
  },
  handleRegister: async (
    registerRequest: registerRequest,
  ): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const result = await register(registerRequest);
      set({
        user: {
          name: result.name,
          email: result.email,
        },
        isLoading: false,
        message: `User with email ${registerRequest.email} registered succesfully`,
      });
      return true;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      set({ error: axiosError?.response?.data?.message, isLoading: false });
      return false;
    }
  },
  handleRefresh: async (): Promise<boolean> => {
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
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError?.response?.data?.message);
      set({ isAuthenticated: false, isLoading: false });
      return false;
    }
  },
  logout: async () => {
    delete api.defaults.headers.common["Authorization"];
    set({
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,
    });
    try {
      await logout();
    } catch (error) {
      console.log("backend logout failed , but client session cleared", error);
    }
  },
  ForgotPassword: async (email): Promise<void> => {
    set({ isLoading: true });
    try {
      await forgotPassword({ email: email });
      set({
        isLoading: false,
        message: `If an account with that email ${email} exists, a reset code has been sent.`,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError?.response?.data?.message, isLoading: false });
    }
  },
  verifyOtp: async (code: string): Promise<boolean> => {
    set({ isLoading: true });
    try {
      const recovery = get().recovery;
      if (!recovery?.email) return false;
      const result = await verifyOtp({ code: code, email: recovery.email });
      return result.isValid;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError?.response?.data?.message, isLoading: false });
      return false;
    }
  },
  setRecoveryEmail: (email): void => {
    set({
      recovery: {
        email: email,
        isOtpVerified: false,
      },
    });
  },
  setError: (error: string) => {
    set({
      error: error,
    });
  },
  setMessage: (message: string) => {
    set({
      message: message,
    });
  },
  resetStatus: () => {
    set({
      message: null,
      error: null,
    });
  },
}));
