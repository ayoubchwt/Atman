import { NoteResponseDto } from "../dtos/NoteDTO";
import { NoteInviteDto } from "../dtos/SharedNoteDTO";
import { UserNotFoundException } from "../exceptions/AuthException";
import { NoteNotFoundException } from "../exceptions/NoteException";
import { NoteInviteNotFoundException } from "../exceptions/NoteInviteException";
import { NoteMapper } from "../mappers/NotesMapper";
import Note, { INote } from "../models/Note";
import NoteInvite from "../models/NoteInvite";
import User, { IUser } from "../models/User";

export class SharedNoteService {
  public static async getSharedNotes(
    userId: string,
  ): Promise<NoteResponseDto[]> {
    const notes: INote[] = await Note.find({
      "sharedWith.userId": userId,
    }).sort({
      createdAt: -1,
    });
    return NoteMapper.toListResponseDto(notes);
  }
  public static async createInvite(
    userId: string,
    dto: NoteInviteDto,
  ): Promise<void> {
    const guestUser: IUser | null = await User.findOne({
      email: dto.guestEmail,
    });
    if (!guestUser)
      throw new UserNotFoundException(
        `User with Email ${dto.guestEmail} was not found`,
      );
    const note: INote | null = await Note.findOne({
      _id: dto.noteId,
      userId: userId,
    });
    if (!note)
      throw new NoteNotFoundException(
        `Note with ID ${dto.noteId} was not found`,
      );
    await NoteInvite.create({
      noteId: dto.noteId,
      senderId: userId,
      receiverId: guestUser._id,
      role: dto.role,
    });
  }
  public static async acceptInvite(
    userId: string,
    inviteId: string,
  ): Promise<void> {
    const noteInvite: IUser | null = await NoteInvite.findOne({
      _id: inviteId,
      receiverId: userId,
    });
    if (!noteInvite)
      throw new NoteInviteNotFoundException(
        `Note not found, make sure it still exist`,
      );
  }
}
