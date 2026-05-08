import { UserResponseDto, UserSettingsResponseDto } from "../dtos/UserDTO";
import { IUser } from "../models/User";

export class UserMapper {
  public static toResponseDto(user: IUser): UserResponseDto {
    return {
      id: user._id.toString(),
      name: user.name,
      sessions: user.sessions,
    };
  }
  public static toSettingsResponseDto(user: IUser): UserSettingsResponseDto {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
