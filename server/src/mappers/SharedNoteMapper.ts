import { inviteReponseDto, SharedUserResponseDto } from "../dtos/SharedNoteDTO";
import { INote } from "../models/Note";
import { INoteInvite } from "../models/NoteInvite";
import { IUser } from "../models/User";

export class SharedNoteMapper {
  //   public static toSharedUserListDto(note: INote): SharedUserResponseDto[] {
  //     const sharedUsers = note.sharedWith;
  //     return sharedUsers.map((user) => {
  //       return {
  //         userId: user.userId,
  //         name: user.userId.name,
  //       };
  //     });
  //   }
  //   public toInviteResponseDto(noteInvite: INoteInvite): inviteReponseDto {
  //     return {
  //       guestEmail: noteInvite.receiverId.email,
  //     };
  //   }
  public static toShareUserResponseDto(
    user: IUser,
    role: "viewer" | "editor" | "owner",
  ): SharedUserResponseDto {
    return {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      role: role,
    };
  }
}
