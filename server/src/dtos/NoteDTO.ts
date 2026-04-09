export interface CreateNoteDto {
  title: string;
  content: string;
  tags: string[];
}
export interface UpdateNoteDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
}
export interface NoteResponseDto {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
