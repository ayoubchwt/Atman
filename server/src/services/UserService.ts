import { userResponseDto } from "../dtos/UserDTO";
import { UserNotFoundException } from "../exceptions/AuthException";
import { UserMapper } from "../mappers/UserMapper";
import User, { IUser } from "../models/User";

export class UserService {
  public static async getUser(userId: string): Promise<userResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    return UserMapper.toResponseDto(user);
  }
  public static async incrementUserSessions(
    userId: string,
  ): Promise<userResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    user.sessions = (user.sessions || 0) + 1;
    const updatedUser = await user.save();
    return UserMapper.toResponseDto(updatedUser);
  }
}
