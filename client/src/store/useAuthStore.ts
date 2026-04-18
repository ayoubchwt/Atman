import { create } from "zustand";
import { AxiosError } from "axios";
import { login, register } from "../services/AuthService";
import type { LoginRequest, registerRequest } from "../types/auth";
import api from "../api/axios";
interface AuthState {
  user: { name: string; email: string; accessToken?: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  message: string | null;
  handleLogin: (loginRequest: LoginRequest) => Promise<boolean>;
  handleRegister: (registerRequest: registerRequest) => Promise<boolean>;
  logout: () => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
  resetStatus: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
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
  logout: () => {
    delete api.defaults.headers.common["Authorization"];
    set({
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,
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
