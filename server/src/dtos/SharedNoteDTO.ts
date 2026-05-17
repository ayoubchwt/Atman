export interface NoteInviteDto {
  guestEmail: string;
  role: "editor" | "viewer";
  noteId: string;
}
export interface UpdateNoteInviteStatusDto {
  inviteId: string;
  status: "accepted" | "rejected";
}
export interface SharedUserResponseDto {
  userId: string;
  name: string;
  email: string;
  role: "editor" | "viewer";
}
