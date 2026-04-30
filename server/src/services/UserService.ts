import { userResponseDto } from "../dtos/userDTO";
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
}
