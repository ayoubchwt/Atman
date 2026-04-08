import { CreateNoteDto, NoteResponseDto } from "../dtos/NoteDTO";
import { NoteMapper } from "../mappers/NotesMapper";
import Note, { INote } from "../models/Note";

export class NoteService {
    public static async createNote(userId: string, dto: CreateNoteDto): Promise<NoteResponseDto> {
        const note: INote = NoteMapper.toEntity(dto, userId);
        const savedNote = await note.save();
        return NoteMapper.toResponseDto(savedNote);
    }
    public static async getNotes(userId: string): Promise<NoteResponseDto[]> {
        const notes: INote[] = await Note.find({ user: userId }).sort({ createdAt: -1 });
        return NoteMapper.toListResponseDto(notes);
    }
    public static async getNoteById(noteId) 
}