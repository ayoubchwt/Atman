import api from "../api/Axios";
import type {
  CreateNoteDto,
  UpdateNoteDto,
  NoteResponseDto,
} from "../types/Note";

export const getNotes = async (): Promise<NoteResponseDto[]> => {
  const response = await api.get<NoteResponseDto[]>("/note/get");
  return response.data;
};
export const addNote = async (
  data: CreateNoteDto,
): Promise<NoteResponseDto> => {
  const response = await api.post<NoteResponseDto>("/note/add", data);
  return response.data;
};
export const updateNote = async (
  id: string,
  data: UpdateNoteDto,
): Promise<NoteResponseDto> => {
  const response = await api.patch<NoteResponseDto>(`/note/update/${id}`, data);
  return response.data;
};
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete<void>(`/note/delete/${id}`);
};
