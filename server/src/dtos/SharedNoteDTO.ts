export interface NoteInviteDto {
  guestEmail: string;
  role: "editor" | "viewer";
  noteId: string;
}
export interface UpdateInviteStatusDto {
  id: string;
  status: "accepted" | "rejected";
}
export interface SharedUserResponseDto {
  userId: string;
  name: string;
  email: string;
  role: "editor" | "viewer";
}
export interface inviteReponseDto {
  id: string;
  guestEmail: string;
  guestName: string;
  role: "editor" | "viewer";
  status: "accepted" | "pending" | "rejected";
}
export interface UpdateInviteRoleDto {
  id: string;
  role: "editor" | "viewer";
}
