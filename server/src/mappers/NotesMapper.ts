import { CreateNoteDto, NoteResponseDto } from "../dtos/NoteDTO";
import Note, { INote } from "../models/Note";

export class NoteMapper {
  public static toResponseDto(note: INote): NoteResponseDto {
    return {
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      folder: note.folder ? note.folder.toString() : null,
    };
  }
  public static toListResponseDto(notes: INote[]): NoteResponseDto[] {
    return notes.map((note) => this.toResponseDto(note));
  }
  public static toEntity(dto: CreateNoteDto, userId: string): INote {
    return new Note({
      user: userId,
      title: dto.title,
      content: dto.content,
    });
  }
}
