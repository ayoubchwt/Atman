import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

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
}
