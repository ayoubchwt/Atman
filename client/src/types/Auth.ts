export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  name: string;
  email: string;
}
export interface registerRequest {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  name: string;
  email: string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface VerifyOtpRequest {
  email: string;
  code: string;
}
export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}
