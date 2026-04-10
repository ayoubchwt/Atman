import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/AuthException";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  private static validateToken(token: string, request: Request) {
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret) as { id: string };
    request.user = { id: decoded.id };
  }
  public static async verifyAccessToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new UnauthorizedException("Access denied. No token provided");
      }
      const token = authHeader.split(" ")[1] || "";
      AuthMiddleware.validateToken(token, request);
      next();
    } catch (error) {
      next(new UnauthorizedException("Invalid or expired access token"));
    }
  }
  public static async verifyRefreshToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = request.cookies.refreshToken;
      if (!token) {
        throw new UnauthorizedException("Refresh token missing.");
      }
      AuthMiddleware.validateToken(token, request);
      next();
    } catch (error) {
      next(new UnauthorizedException("Session expired. Please login again"));
    }
  }
}
