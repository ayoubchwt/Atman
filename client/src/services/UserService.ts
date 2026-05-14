import api from "../api/Axios";
import type {
  deleteUserDto,
  UpdateUserDto,
  UserResponseDto,
  UserSettingsResponseDto,
} from "../types/User";

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
export const updateUserName = async (
  dto: UpdateUserDto,
): Promise<UserResponseDto> => {
  const response = await api.patch<UserResponseDto>(
    "/user/update-username",
    dto,
  );
  return response.data;
};
export const updateUserPassword = async (
  dto: UpdateUserDto,
): Promise<UserResponseDto> => {
  const response = await api.patch<UserResponseDto>(
    "/user/update-password",
    dto,
  );
  return response.data;
};
export const updateUserEmail = async (): Promise<void> => {
  await api.post<void>("/user/update-email");
};
export const confirmUpdateUserEmail = async (
  dto: UpdateUserDto,
): Promise<UpdateUserDto> => {
  const response = await api.patch<UserResponseDto>(
    "/user/confirm-update-email",
    dto,
  );
  return response.data;
};
export const deleteUser = async (): Promise<void> => {
  await api.post<void>("/user/delete");
};
export const confirmDeleteUser = async (dto: deleteUserDto): Promise<void> => {
  await api.post<void>("/user/confirm-delete", dto);
};
