export interface UserResponseDto {
  id: string;
  name: string;
  sessions: number;
}
export interface UpdateUserDto {
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  code?: string;
}
export interface UserSettingsResponseDto {
  id: string;
  name: string;
  email: string;
}
