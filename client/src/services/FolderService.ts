import api from "../api/Axios";
import type {
  CreateFolderDto,
  FolderResponseDto,
  UpdateFolderDto,
} from "../types/Folder";

export const getFolders = async (): Promise<FolderResponseDto[]> => {
  const response = await api.get<FolderResponseDto[]>("/folder/");
  return response.data;
};
export const addFolder = async (
  data: CreateFolderDto,
): Promise<FolderResponseDto> => {
  const response = await api.post<FolderResponseDto>("/folder/", data);
  return response.data;
};
export const updateFolder = async (
  id: string,
  data: UpdateFolderDto,
): Promise<FolderResponseDto> => {
  const response = await api.patch<FolderResponseDto>(`/folder/${id}`, data);
  return response.data;
};
export const deleteFolder = async (id: string): Promise<void> => {
  await api.delete<void>(`/folder/${id}`);
};
