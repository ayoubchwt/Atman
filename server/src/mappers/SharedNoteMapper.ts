import { inviteReponseDto, SharedUserResponseDto } from "../dtos/SharedNoteDTO";
import { INote } from "../models/Note";
import { INoteInvite } from "../models/NoteInvite";

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
}
