import {
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
  verifyOtpResponseDto,
} from "../dtos/AuthDTO";
import User, { IUser } from "../models/User";

export class UserMapper {
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
  public static toVerifyOtpResponseDto(isValid: boolean): verifyOtpResponseDto {
    return {
      isValid: isValid,
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
