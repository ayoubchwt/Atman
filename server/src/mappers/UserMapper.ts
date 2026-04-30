import { userResponseDto } from "../dtos/userDTO";
import { IUser } from "../models/User";

export class UserMapper {
  public static toResponseDto(user: IUser): userResponseDto {
    return {
      id: user._id.toString(),
      name: user.name,
      sessions: user.sessions,
    };
  }
}
