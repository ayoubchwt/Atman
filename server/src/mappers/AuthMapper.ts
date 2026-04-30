import {
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
} from "../dtos/AuthDTO";
import User, { IUser } from "../models/User";

export class AuthMapper {
  public static toRegisterResponseDto(user: IUser): RegisterResponseDto {
    return {
      name: user.name,
      email: user.email,
    };
  }
  public static toLoginResponseDto(
    token: string,
    user: IUser,
  ): LoginResponseDto {
    return {
      accessToken: token,
      name: user.name,
      email: user.email,
    };
  }
  public static toEntity(dto: registerRequestDto): IUser {
    return new User({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
  }
}
