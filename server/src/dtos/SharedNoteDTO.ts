export interface NoteInviteDto {
  guestEmail: string;
  role: "editor" | "viewer";
  noteId: string;
}
