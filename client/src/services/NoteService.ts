import api from "../api/Axios";
import type {
  CreateNoteDto,
  UpdateNoteDto,
  NoteResponseDto,
  NoteAiRequestDto,
} from "../types/Note";
import type { NoteInviteDto } from "../types/shareNote";

export const getNotes = async (): Promise<NoteResponseDto[]> => {
  const response = await api.get<NoteResponseDto[]>("/note/");
  return response.data;
};
export const getSharedNotes = async (): Promise<NoteResponseDto[]> => {
  const response = await api.get<NoteResponseDto[]>("/note/shared");
  return response.data;
};
export const getNotesByTitle = async (
  searchValue: string,
): Promise<NoteResponseDto[]> => {
  const response = await api.get<NoteResponseDto[]>("/note/search", {
    params: { searchValue: searchValue },
  });
  return response.data;
};
export const getNotesByFolder = async (
  folderId: string,
): Promise<NoteResponseDto[]> => {
  const response = await api.get<NoteResponseDto[]>(`/note/folder/${folderId}`);
  return response.data;
};
export const addNote = async (
  data: CreateNoteDto,
): Promise<NoteResponseDto> => {
  const response = await api.post<NoteResponseDto>("/note/", data);
  return response.data;
};
export const updateNote = async (
  id: string,
  data: UpdateNoteDto,
): Promise<NoteResponseDto> => {
  const response = await api.patch<NoteResponseDto>(`/note/${id}`, data);
  return response.data;
};
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete<void>(`/note/${id}`);
};
export const getAiResponse = async (
  id: string,
  data: NoteAiRequestDto,
): Promise<string> => {
  const response = await api.post<string>(`/note/ai/${id}`, data);
  return response.data;
};
export const shareNote = async (dto: NoteInviteDto): Promise<void> => {
  await api.post<void>("/note/share", dto);
};
