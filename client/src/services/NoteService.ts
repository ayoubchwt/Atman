import api from "../api/Axios";
import type {
  CreateNoteDto,
  UpdateNoteDto,
  NoteResponseDto,
  NoteAiRequestDto,
} from "../types/Note";
import type {
  InviteNotification,
  inviteReponseDto,
  NoteInviteDto,
  RemoveCollaboratorDto,
  SharedUserResponseDto,
  UpdateInviteRoleDto,
  UpdateInviteStatusDto,
} from "../types/shareNote";

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
  data: UpdateNoteDto,
): Promise<NoteResponseDto> => {
  const response = await api.patch<NoteResponseDto>("/note", data);
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
export const getInvites = async (
  noteId: string,
): Promise<inviteReponseDto[]> => {
  const response = await api.get<inviteReponseDto[]>(`/note/invites/${noteId}`);
  return response.data;
};
export const updateInviteRole = async (
  data: UpdateInviteRoleDto,
): Promise<void> => {
  await api.patch<void>("/note/update-invite-role", data);
};
export const updateInviteStatus = async (
  data: UpdateInviteStatusDto,
): Promise<void> => {
  await api.post<void>("/note/update-invite-status", data);
};

export const deleteInvite = async (inviteId: string): Promise<void> => {
  await api.delete<void>(`/note/delete-invite/${inviteId}`);
};
export const getInviteNotifications = async (): Promise<
  InviteNotification[]
> => {
  const response = await api.get<InviteNotification[]>(
    "/note/invite-notifications",
  );
  return response.data;
};
export const getSharedWith = async (
  noteId: string,
): Promise<SharedUserResponseDto[]> => {
  const response = await api.get<SharedUserResponseDto[]>(
    `/note/shared-with/${noteId}`,
  );
  return response.data;
};
export const removeCollaborator = async (
  data: RemoveCollaboratorDto,
): Promise<void> => {
  await api.post<void>("/note/remove-collaborator", data);
};
