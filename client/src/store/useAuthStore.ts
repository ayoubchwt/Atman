import { create } from "zustand";
import type { LoginRequest } from "../types/auth";
import { login } from "../services/authService";
import { AxiosError } from "axios";
import api from "../api/axios";
interface AuthState {
  user: { name: string; email: string; accessToken: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  handleLogin: (loginRequest: LoginRequest) => Promise<void>;
  logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  handleLogin: async (loginRequest: LoginRequest) => {
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
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      set({
        error: axiosError.message || "Log in Failed",
        isLoading: false,
      });
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
}));
