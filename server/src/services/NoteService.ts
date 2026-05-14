import {
  CreateNoteDto,
  NoteAiRequestDto,
  NoteResponseDto,
  UpdateNoteDto,
} from "../dtos/NoteDTO";
import { NoteNotFoundException } from "../exceptions/NoteException";
import { NoteMapper } from "../mappers/NotesMapper";
import Note, { INote } from "../models/Note";
import { GemmaUtils } from "../utlis/Gemma";

export class NoteService {
  public static async getNotes(userId: string): Promise<NoteResponseDto[]> {
    const notes: INote[] = await Note.find({ userId: userId }).sort({
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
      userId: userId,
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
      userId: userId,
    });
    return NoteMapper.toListResponseDto(notes);
  }
  public static async getNoteByFolder(
    folderId: string,
    userId: string,
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
    if (!note)
      throw new NoteNotFoundException(
        `Cannot find note with User Id ${userId}`,
      );
    const savedNote = await note.save();

    return NoteMapper.toResponseDto(savedNote);
  }
  public static async updateNote(
    noteId: string,
    userId: string,
    dto: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId: userId },
      { $set: dto },
      { returnDocument: "after" },
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
      userId: userId,
    });
    if (!deletedNote) {
      throw new NoteNotFoundException(
        `Note not found or you don't have permission to delete it`,
      );
    }
  }
  public static async getAiResponse(
    noteId: string,
    dto: NoteAiRequestDto,
  ): Promise<string> {
    const note: INote | null = await Note.findById(noteId);
    if (!note)
      throw new NoteNotFoundException(`Cannot find note with id ${noteId}`);
    const response = await GemmaUtils.getAIResponse(dto.prompt, note.content);
    return response;
  }
}
