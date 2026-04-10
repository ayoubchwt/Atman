import {
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
} from "../dtos/AuthDTO";
import User, { IUser } from "../models/User";

export class UserMapper {
  public static toRegisterResponseDto(user: IUser): RegisterResponseDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
  public static toLoginResponseDto(
    token: string,
    user: IUser,
  ): LoginResponseDto {
    return {
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
  public static toEntity(dto: registerRequestDto): IUser {
    return new User({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
    });
  }
}
