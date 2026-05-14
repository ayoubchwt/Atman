import {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  registerRequestDto,
  RegisterResponseDto,
  ResetPasswordRequestDto,
  VerifyOtpRequestDto,
} from "../dtos/AuthDTO";
import {
  InvalidRequestParameters,
  UnauthorizedException,
  UserAlreadyExistException,
  UserNotFoundException,
} from "../exceptions/AuthException";
import { AuthMapper } from "../mappers/AuthMapper";
import User, { IUser } from "../models/User";
import RefreshToken, { IRefreshToken } from "../models/RefreshToken";
import bcrypt from "bcrypt";
import { AuthUtil } from "../utlis/Auth";
import { NoteService } from "./NoteService";
import { OtpService } from "./OtpService";

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
    const user: IUser = AuthMapper.toEntity(dto);

    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    const savedUser = await user.save();
    await NoteService.createNote(savedUser._id.toString(), {
      title: "Welcome to Atman!",
      content:
        "This is your first note. You can use the AI to explain concepts...",
    });
    return AuthMapper.toRegisterResponseDto(savedUser);
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
    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
    });
    await user.save();
    return {
      dto: AuthMapper.toLoginResponseDto(acessToken, user),
      refreshToken: refreshToken,
    };
  }
  public static async refresh(
    userId: string,
    refreshToken: string,
  ): Promise<LoginResponseDto> {
    const trueRefreshToken: IRefreshToken | null = await RefreshToken.findOne({
      userId: userId,
      token: refreshToken,
    });
    if (!trueRefreshToken) {
      throw new UnauthorizedException();
    }
    const user = await User.findById(userId);
    if (!user) throw new UserNotFoundException();
    const accessToken = AuthUtil.GenerateAccessToken(user._id.toString());
    return AuthMapper.toLoginResponseDto(accessToken, user);
  }
  public static async logout(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const result = await RefreshToken.deleteOne({
      userId: userId,
      token: refreshToken,
    });
    if (result.deletedCount === 0) {
      throw new UnauthorizedException();
    }
  }
  public static async forgotPassword(
    dto: ForgotPasswordRequestDto,
  ): Promise<void> {
    const user: IUser | null = await User.findOne({ email: dto.email }).select(
      "+passwordResetToken +passwordResetExpires",
    );
    if (!user) return;
    await OtpService.sendOtp(user);
  }
  public static async verifyOtp(dto: VerifyOtpRequestDto): Promise<boolean> {
    const user: IUser | null = await User.findOne({ email: dto.email }).select(
      "+passwordResetToken +passwordResetExpires",
    );
    if (!user) throw new UserNotFoundException("User not found");
    const result = OtpService.verifyOtp(user, dto.code);
    return result;
  }
  public static async resetPassword(
    dto: ResetPasswordRequestDto,
  ): Promise<void> {
    const user: IUser | null = await User.findOne({ email: dto.email });
    if (!user) throw new UserNotFoundException("User not found");
    await this.verifyOtp({
      email: dto.email,
      code: dto.code,
    });
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    user.password = await bcrypt.hash(dto.newPassword, saltRounds);
    user.OtpToken = null;
    user.OtpExpires = null;
    await user.save();
  }
}
