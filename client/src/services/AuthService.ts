import api from "../api/axios";
import {
  type LoginRequest,
  type LoginResponse,
  type registerRequest,
  type RegisterResponse,
} from "../types/auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", data);
  return response.data;
};
export const register = async (
  data: registerRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<registerRequest>("/register", data);
  return response.data;
};
export const refresh = async (): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/refresh");
  return response.data;
};
