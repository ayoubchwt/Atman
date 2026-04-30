export interface LoginRequestDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
}
export interface registerRequestDto {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponseDto {
  name: string;
  email: string;
}
export interface ForgotPasswordRequestDto {
  email: string;
}
export interface VerifyOtpRequestDto {
  email: string;
  code: string;
}
export interface ResetPasswordRequestDto {
  email: string;
  code: string;
  newPassword: string;
}
