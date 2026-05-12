import {
  UpdateUserDto,
  UserResponseDto,
  UserSettingsResponseDto,
} from "../dtos/UserDTO";
import {
  InvalidRequestParameters,
  UserNotFoundException,
} from "../exceptions/AuthException";
import { UserMapper } from "../mappers/UserMapper";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import { OtpService } from "./OtpService";

export class UserService {
  public static async getUser(userId: string): Promise<UserResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    return UserMapper.toResponseDto(user);
  }
  public static async incrementUserSessions(
    userId: string,
  ): Promise<UserResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    user.sessions = (user.sessions || 0) + 1;
    const updatedUser = await user.save();
    return UserMapper.toResponseDto(updatedUser);
  }
  public static async getUserSettings(
    userId: string,
  ): Promise<UserSettingsResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    return UserMapper.toSettingsResponseDto(user);
  }

  // updated the user attributes on one's own as a separation of concerns (username may change and password needs to be hashed)
  public static async updateUserName(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updatedUser: IUser | null = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { name: dto.name },
      { returnDocument: "after" },
    );
    if (!updatedUser)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    return UserMapper.toResponseDto(updatedUser);
  }
  public static async updateUserPassword(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user: IUser | null = await User.findById(userId).select("+password");
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    if (!dto.oldPassword || !dto.newPassword)
      throw new InvalidRequestParameters(`You should provide a valid password`);
    const isPasswordCorrect = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    if (!isPasswordCorrect)
      throw new InvalidRequestParameters(
        `Make sure that the old password is correct`,
      );
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(dto.newPassword, saltRounds);
    user.password = hashedPassword;
    const updatedUser = await user.save();
    return UserMapper.toResponseDto(updatedUser);
  }
  public static async UpdateUserEmail(userId: string): Promise<void> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    OtpService.sendOtp(user);
  }
  public static async ConfirmUpdateUserEmail(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user: IUser | null = await User.findById(userId);
    if (!user)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    if (!dto.code) throw new InvalidRequestParameters();
    const result = OtpService.verifyOtp(user, dto.code);
    if (!result) throw new InvalidRequestParameters("Incorrect verification Code");
    const updatedUser: IUser | null = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { email: dto.email },
      { returnDocument: "after" },
    );
    if (!updatedUser)
      throw new UserNotFoundException(`Cannot find the user with id ${userId}`);
    return UserMapper.toResponseDto(updatedUser);
  }
}
