import api from "../api/Axios";
import type { createFolderDto, FolderResponseDto } from "../types/Folder";

export const getFolders = async (): Promise<FolderResponseDto[]> => {
  const response = await api.get<FolderResponseDto[]>("/folder/");
  return response.data;
};
export const addFolder = async (
  data: createFolderDto,
): Promise<FolderResponseDto> => {
  const response = await api.post<FolderResponseDto>("/folder/", data);
  return response.data;
};
