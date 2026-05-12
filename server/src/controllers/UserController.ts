import { Request, Response, NextFunction, response } from "express";
import { UserService } from "../services/UserService";
import { UpdateUserDto } from "../dtos/UserDTO";

export class UserController {
  public static async getUser(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await UserService.getUser(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async incrementUserSessions(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await UserService.incrementUserSessions(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async getUserSettings(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await UserService.getUserSettings(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async updateUserName(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const updateUserDto = request.body as UpdateUserDto;
      const result = await UserService.updateUserName(userId, updateUserDto);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async updateUserEmail(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const updateUserDto = request.body as UpdateUserDto;
      const result = await UserService.ConfirmUpdateUserEmail(userId, updateUserDto);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async updateUserPassword(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const updateUserDto = request.body as UpdateUserDto;
      const result = await UserService.updateUserPassword(
        userId,
        updateUserDto,
      );
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
