import { NextFunction, Request, Response } from "express";
import {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  registerRequestDto,
  ResetPasswordRequestDto,
  VerifyOtpRequestDto,
} from "../dtos/AuthDTO";
import { AuthService } from "../services/AuthService";
import ms from "ms";
export class AuthController {
  public static async login(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const loginRequestDto = request.body as LoginRequestDto;
      const { dto, refreshToken } = await AuthService.login(loginRequestDto);
      const refreshDuration = process.env.REFRESH_EXPIRATION || "7d";
      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: ms(refreshDuration as ms.StringValue),
      });
      response.status(200).json(dto);
    } catch (error) {
      next(error);
    }
  }

  public static async register(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: registerRequestDto = request.body;
      const result = await AuthService.register(dto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async refresh(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const refreshToken = request.cookies.refreshToken;
      const result = await AuthService.refresh(userId, refreshToken);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async logout(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const refreshToken = request.cookies.refreshToken;
      await AuthService.logout(userId, refreshToken);
      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
  public static async forgotPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: ForgotPasswordRequestDto = request.body;
      await AuthService.forgotPassword(dto);
      response
        .status(200)
        .json({ message: "If the user exists, an email has been sent" });
    } catch (error) {
      next(error);
    }
  }
  public static async verifyOtp(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: VerifyOtpRequestDto = request.body;
      await AuthService.verifyOtp(dto);
      response.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      next(error);
    }
  }
  public static async resetPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto: ResetPasswordRequestDto = request.body;
      await AuthService.resetPassword(dto);
      response.status(200).json({ message: "Password restored successfully" });
    } catch (error) {
      next(error);
    }
  }
}
