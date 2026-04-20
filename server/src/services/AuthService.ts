import {
  LoginRequestDto,
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
} from "../dtos/AuthDTO";
import {
  UnauthorizedException,
  UserAlreadyExistException,
  UserNotFoundException,
} from "../exceptions/AuthException";
import { UserMapper } from "../mappers/AuthMapper";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import { AuthUtil } from "../utlis/Auth";
export class AuthService {
  public static async register(
    dto: registerRequestDto,
  ): Promise<RegisterResponseDto> {
    const existingUser: IUser | null = await User.findOne({ email: dto.email });
    if (existingUser) {
      throw new UserAlreadyExistException(
        `The email ${dto.email} already linked to a existent user`,
      );
    }
    const user: IUser = UserMapper.toEntity(dto);

    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const savedUser = await user.save();
    return UserMapper.toRegisterResponseDto(savedUser);
  }

  public static async login(dto: LoginRequestDto): Promise<any> {
    const user: IUser | null = await User.findOne({ email: dto.email }).select(
      "+password",
    );
    if (!user) {
      throw new UserNotFoundException();
    }
    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordCorrect) {
      throw new UserNotFoundException();
    }
    const acessToken = AuthUtil.GenerateAccessToken(user._id.toString());
    const refreshToken = AuthUtil.GenerateRefreshToken(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save();
    return {
      dto: UserMapper.toLoginResponseDto(acessToken, user),
      refreshToken: refreshToken,
    };
  }
  public static async refresh(
    userId: string,
    refreshToken: string,
  ): Promise<LoginResponseDto> {
    const user: IUser = await User.findById(userId).select("+refreshToken");
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }
    const accessToken = AuthUtil.GenerateAccessToken(user._id.toString());
    return UserMapper.toLoginResponseDto(accessToken, user);
  }
  public static async logout(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const user: IUser = await User.findById(userId).select("+refreshToken");
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }
    user.refreshToken = null;
    await user.save();
  }
}
