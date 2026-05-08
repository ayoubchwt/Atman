import api from "../api/Axios";
import type { UserResponseDto, UserSettingsResponseDto } from "../types/User";

export const getUser = async (): Promise<UserResponseDto> => {
  const response = await api.get<UserResponseDto>("/user/");
  return response.data;
};
export const incrementSessions = async (): Promise<UserResponseDto> => {
  const response = await api.post<UserResponseDto>("/user/sessions");
  return response.data;
};
export const getUserSettings = async (): Promise<UserSettingsResponseDto> => {
  const response = await api.get<UserSettingsResponseDto>("/user/settings");
  return response.data;
};
