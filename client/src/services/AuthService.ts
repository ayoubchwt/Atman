import api from "../api/Axios";
import type {
  LoginRequest,
  LoginResponse,
  registerRequest,
  RegisterResponse,
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
