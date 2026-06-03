import { NoteResponseDto } from "../dtos/NoteDTO";
import {
  inviteReponseDto,
  NoteInviteDto,
  SharedUserResponseDto,
  UpdateInviteStatusDto,
  UpdateInviteRoleDto,
} from "../dtos/SharedNoteDTO";
import {
  InvalidRequestParameters,
  UserNotFoundException,
} from "../exceptions/AuthException";
import {
  NoteNotFoundException,
  UnauthorizedNoteAccessException,
} from "../exceptions/NoteException";
import { NoteInviteNotFoundException } from "../exceptions/NoteInviteException";
import { NoteMapper } from "../mappers/NotesMapper";
import Note, { INote } from "../models/Note";
import NoteInvite, { INoteInvite } from "../models/NoteInvite";
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
    const checkForShared = await NoteInvite.findOne({
      noteId: note._id,
      receiverId: guestUser._id,
      senderId: userId,
    });
    if (checkForShared)
      throw new InvalidRequestParameters(
        "An invitation is already sent to that user",
      );
    await NoteInvite.create({
      noteId: dto.noteId,
      senderId: userId,
      receiverId: guestUser._id,
      role: dto.role,
    });
  }
  public static async getNoteInvites(
    userId: string,
    noteId: string,
  ): Promise<inviteReponseDto[]> {
    const note: INote | null = await Note.findOne({
      _id: noteId,
      userId: userId,
    });
    if (!note)
      throw new NoteNotFoundException(
        "Note does Not exist or you dont have the right permission on it",
      );
    const invites: INoteInvite[] | null = await NoteInvite.find({
      noteId: noteId,
    }).populate({
      path: "receiverId",
      select: "name email",
      model: "User",
    });
    //needs changes
    return invites.map((invite: any) => {
      return {
        id: invite._id,
        guestEmail: invite.receiverId.email,
        guestName: invite.receiverId.name,
        role: invite.role,
        status: invite.status,
      };
    });
  }
  public static async updateInviteStatus(
    userId: string,
    dto: UpdateInviteStatusDto,
  ): Promise<void> {
    const noteInvite: INoteInvite | null = await NoteInvite.findOne({
      _id: dto.id,
      receiverId: userId,
      status: "pending",
    });
    if (!noteInvite)
      throw new NoteInviteNotFoundException(
        `Note not found, make sure it still exist`,
      );
    if (dto.status === "accepted") {
      await Note.updateOne(
        {
          _id: noteInvite.noteId,
        },
        {
          $addToSet: {
            sharedWith: {
              userId: noteInvite.receiverId,
              role: noteInvite.role,
            },
          },
        },
      );
    }
    await NoteInvite.deleteOne({
      _id: dto.id,
    });
  }
  public static async getSharedWith(
    userId: string,
    noteId: string,
  ): Promise<SharedUserResponseDto[]> {
    const note: INote | null = await Note.findOne({
      _id: noteId,
      $or: [
        {
          userId: userId,
        },
        {
          "sharedWith.userId": userId,
        },
      ],
    }).populate("sharedWith", "email", "name");

    if (!note) throw new UnauthorizedNoteAccessException();
    // code debt , i dont have the right mental state to think about anything better
    return [note.sharedWith as any].map((item) => ({
      userId: item.userId._id.toString(),
      name: item.userId.name,
      email: item.userId.email,
      role: item.role,
    }));
  }
  public static async updateInviteRole(
    userId: string,
    dto: UpdateInviteRoleDto,
  ): Promise<void> {
    const noteInvite: INoteInvite | null = await NoteInvite.findOne({
      _id: dto.id,
      senderId: userId,
    });
    if (!noteInvite)
      throw new UnauthorizedNoteAccessException(
        "Invite not found or you do not have permission to modify it.",
      );
    noteInvite.role = dto.role;
    await noteInvite.save();
  }
  public static async deleteInvite(
    userId: string,
    inviteId: string,
  ): Promise<void> {
    const noteInvite: INoteInvite | null = await NoteInvite.findOneAndDelete({
      _id: inviteId,
      senderId: userId,
    });
    if (!noteInvite) throw new NoteNotFoundException(`Invite was not found`);
  }
}
