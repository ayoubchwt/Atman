import { NextFunction, Request, Response } from "express";
import { LoginRequestDto, registerRequestDto } from "../dtos/AuthDTO";
import { AuthService } from "../services/AuthService";
import ms from "ms";
import { UnauthorizedException } from "../exceptions/AuthException";
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
        sameSite: "strict",
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
      if (!userId || !refreshToken) {
        throw new UnauthorizedException();
      }
      const result = await AuthService.refresh(userId, refreshToken);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

}
