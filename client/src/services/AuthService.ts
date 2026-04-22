import api from "../api/Axios";
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  registerRequest,
  RegisterResponse,
  ResetPasswordRequest,
  verifyOtpResponse,
} from "../types/Auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};
export const register = async (
  data: registerRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<registerRequest>("/auth/register", data);
  return response.data;
};
export const refresh = async (): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/refresh");
  return response.data;
};
export const logout = async (): Promise<void> => {
  await api.post<void>("/auth/logout");
};
export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<void> => {
  await api.post<void>("/auth/forgot-password", data);
};
export const verifyOtp = async (
  data: ResetPasswordRequest,
): Promise<verifyOtpResponse> => {
  const response = await api.post<verifyOtpResponse>("/auth/verify-otp", data);
  return response.data;
};
export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<void> => {
  await api.post<void>("/auth/reset-password", data);
};
