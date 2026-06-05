import { NoteResponseDto } from "../dtos/NoteDTO";
import {
  inviteReponseDto,
  NoteInviteDto,
  SharedUserResponseDto,
  UpdateInviteStatusDto,
  UpdateInviteRoleDto,
  InviteNotification,
  RemoveCollaboratorDto,
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
import { SharedNoteMapper } from "../mappers/SharedNoteMapper";
import Note, { INote } from "../models/Note";
import NoteInvite, { INoteInvite } from "../models/NoteInvite";
import User, { IUser } from "../models/User";
import { UserService } from "./UserService";

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
    if (userId === guestUser._id.toString())
      throw new InvalidRequestParameters(
        "Invalid invite, the current user is the owner",
      );
    const note: INote | null = await Note.findOne({
      _id: dto.noteId,
      userId: userId,
    });
    if (!note)
      throw new NoteNotFoundException(
        `Note with ID ${dto.noteId} was not found`,
      );
    if (
      note.sharedWith.find(
        (collborator) =>
          collborator.userId.toString() === guestUser._id.toString(),
      )
    )
      throw new InvalidRequestParameters(
        "The user is already a collborator on this note",
      );
    if (note.sharedWith.length === 5)
      throw new InvalidRequestParameters(
        "The maximum number of collaborators is 5",
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
  private static async getSharedWith(
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
    }).populate("sharedWith.userId", "email name");

    if (!note)
      throw new UnauthorizedNoteAccessException(
        "Note not found or you dont have permission to access it",
      );
    // code debt , i dont have the right mental state to think about anything better
    return note.sharedWith.map((item: any) => ({
      userId: item.userId._id.toString(),
      name: item.userId.name,
      email: item.userId.email,
      role: item.role,
    }));
  }
  public static async getCollaborators(
    userId: string,
    noteId: string,
  ): Promise<SharedUserResponseDto[]> {
    const owner: IUser | null = await User.findById(userId);
    if (!owner)
      throw new InvalidRequestParameters(
        "You need to be the owner of this note in order to make this request",
      );
    const sharedWith: SharedUserResponseDto[] = await this.getSharedWith(
      userId,
      noteId,
    );
    return [
      SharedNoteMapper.toShareUserResponseDto(owner, "owner"),
      ...sharedWith,
    ];
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
  public static async getInviteNotifications(
    userId: string,
  ): Promise<InviteNotification[]> {
    const noteInvites: INoteInvite[] = await NoteInvite.find({
      receiverId: userId,
    })
      .populate("noteId", "title")
      .populate("senderId", "name");
    return noteInvites.map((invite: any) => ({
      id: invite._id,
      title: invite.noteId.title,
      senderName: invite.senderId.name,
      role: invite.role,
      createdAt: invite.createdAt,
    }));
  }
  public static async removeCollaborator(
    userId: string,
    dto: RemoveCollaboratorDto,
  ): Promise<void> {
    const note: INote | null = await Note.findOne({
      _id: dto.noteId,
      userId: userId,
    });
    if (!note)
      throw new NoteNotFoundException("Cannot find the requested note");
    note.sharedWith = note.sharedWith.filter(
      (collaborator) => collaborator.userId.toString() !== dto.guestId,
    );
    await note.save();
  }
}
