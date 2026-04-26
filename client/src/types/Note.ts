export interface CreateNoteDto {
  title: string;
  content: string;
}
export interface UpdateNoteDto {
  title?: string;
  content?: string;
}
export interface NoteResponseDto {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  folder: string | null;
}
