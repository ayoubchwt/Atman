import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/AuthException";
export class SocketAuthMiddleware {
  private static validateToken(token: string, socket: Socket) {
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret) as { id: string };
    socket.user = { id: decoded.id };
  }
  public static verifyAccessToken(
    socket: Socket,
    next: (err?: Error) => void,
  ): void {
    try {
      const token = socket.handshake.query.token as string;
      if (!token)
        return next(
          new UnauthorizedException("Token does not exist , try again"),
        );
      SocketAuthMiddleware.validateToken(token, socket);
      next();
    } catch (error) {
      return next(
        new UnauthorizedException("Invalid or expired session, try again."),
      );
    }
  }
}
