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
