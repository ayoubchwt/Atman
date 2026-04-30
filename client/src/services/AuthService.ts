import api from "../api/Axios";
import type {
  LoginRequestDto,
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
  ForgotPasswordRequestDto,
  VerifyOtpRequestDto,
  ResetPasswordRequestDto,
} from "../types/Auth";

export const login = async (
  data: LoginRequestDto,
): Promise<LoginResponseDto> => {
  const response = await api.post<LoginResponseDto>("/auth/login", data);
  return response.data;
};
export const register = async (
  data: registerRequestDto,
): Promise<RegisterResponseDto> => {
  const response = await api.post<registerRequestDto>("/auth/register", data);
  return response.data;
};
export const refresh = async (): Promise<LoginResponseDto> => {
  const response = await api.post<LoginResponseDto>("/auth/refresh");
  return response.data;
};
export const logout = async (): Promise<void> => {
  await api.post<void>("/auth/logout");
};
export const forgotPassword = async (
  data: ForgotPasswordRequestDto,
): Promise<void> => {
  await api.post<void>("/auth/forgot-password", data);
};
export const verifyOtp = async (data: VerifyOtpRequestDto): Promise<void> => {
  await api.post<void>("/auth/verify-otp", data);
};
export const resetPassword = async (
  data: ResetPasswordRequestDto,
): Promise<void> => {
  await api.post<void>("/auth/reset-password", data);
};
