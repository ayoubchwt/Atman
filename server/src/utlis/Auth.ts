import jwt from "jsonwebtoken";

export class AuthUtil {
  public static GenerateAccessToken(userId: string) {
    const secret = process.env.JWT_SECRET!;
    const expiration = process.env.JWT_EXPIRATION || "15m";
    return jwt.sign(
      {
        id: userId,
      },
      secret,
      {
        expiresIn: expiration as any,
      },
    );
  }
  public static GenerateRefreshToken(userId: string) {
    const secret = process.env.JWT_SECRET!;
    const expiration = process.env.REFRESH_EXPIRATION|| "7d";
    return jwt.sign(
      {
        id: userId,
      },
      secret,
      {
        expiresIn: expiration as any,
      },
    );
  }
}
