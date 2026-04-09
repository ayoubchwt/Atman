export interface LoginRequestDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  accessToken: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface registerRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface RegisterResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
