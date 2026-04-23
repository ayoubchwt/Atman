import { NoteResponseDto } from "./NoteDTO";

export interface createFolderDto {
  label: string;
}
export interface FolderResponseDto {
  id: string;
  label: string;
  notes?: NoteResponseDto[];
}
