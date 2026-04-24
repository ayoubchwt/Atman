import { CreateNoteDto, NoteResponseDto, UpdateNoteDto } from "../dtos/NoteDTO";
import { NoteNotFoundException } from "../exceptions/NoteException";
import { NoteMapper } from "../mappers/NotesMapper";
import Note, { INote } from "../models/Note";

export class NoteService {
  public static async getNotes(userId: string): Promise<NoteResponseDto[]> {
    const notes: INote[] = await Note.find({ user: userId }).sort({
      createdAt: -1,
    });
    return NoteMapper.toListResponseDto(notes);
  }
  public static async getNoteById(
    noteId: string,
    userId: string,
  ): Promise<NoteResponseDto> {
    const note: INote | null = await Note.findOne({
      _id: noteId,
      user: userId,
    });
    if (!note) {
      throw new NoteNotFoundException(`Note with ID ${noteId} was not found`);
    }
    return NoteMapper.toResponseDto(note);
  }
  public static async getNoteByTitle(
    title: string,
    userId: string,
  ): Promise<NoteResponseDto[]> {
    const notes: INote[] = await Note.find({
      title: { $regex: new RegExp(title, "i") },
      user: userId,
    });
    return NoteMapper.toListResponseDto(notes);
  }
  public static async getNoteByFolder(
    folderId: string,
  ): Promise<NoteResponseDto[]> {
    const notes: INote[] = await Note.find({
      folder: folderId,
    });
    return NoteMapper.toListResponseDto(notes);
  }
  public static async createNote(
    userId: string,
    dto: CreateNoteDto,
  ): Promise<NoteResponseDto> {
    const note: INote = NoteMapper.toEntity(dto, userId);

    const savedNote = await note.save();

    return NoteMapper.toResponseDto(savedNote);
  }
  public static async updateNote(
    noteId: string,
    userId: string,
    dto: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { $set: dto },
      { new: true },
    );
    if (!updatedNote) {
      throw new NoteNotFoundException(
        `Note not found or you don't have permission to edit it`,
      );
    }
    return NoteMapper.toResponseDto(updatedNote);
  }
  public static async deleteNote(
    noteId: string,
    userId: string,
  ): Promise<void> {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });
    if (!deletedNote) {
      throw new NoteNotFoundException(
        `Note not found or you don't have permission to delete it`,
      );
    }
  }
}
