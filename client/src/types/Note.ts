export interface CreateNoteDto {
  title: string;
  content: string;
  tags?: string[];
}
export interface UpdateNoteDto {
  title?: string;
  content?: string;
  tags?: string[];
}
export interface NoteResponseDto {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  isSynced?: boolean;
}
