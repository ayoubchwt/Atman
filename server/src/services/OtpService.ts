import { IUser } from "../models/User";
import bcrypt from "bcrypt";
import { EmailUtils } from "../utlis/Email";
import { InvalidRequestParameters } from "../exceptions/AuthException";

export class OtpService {
  public static async sendOtp(user: IUser): Promise<void> {
    const code = (Math.floor(Math.random() * 90000) + 10000).toString();
    const hashedCode = await bcrypt.hash(code, 10);
    user.OtpToken = hashedCode;
    user.OtpExpires = new Date(
      Date.now() + Number(process.env.OTP_EXPIRATION) || 3600000,
    );
    await user.save();
    await EmailUtils.sendMail(user.email, code);
  }
  public static async verifyOtp(user: IUser, code: string): Promise<boolean> {
    if (!user.OtpExpires || !user.OtpToken)
      throw new InvalidRequestParameters();
    if (user.OtpExpires < new Date()) {
      throw new InvalidRequestParameters(
        " The password reset token is expired",
      );
    }
    const isCodeValid = await bcrypt.compare(code, user.OtpToken);
    if (!isCodeValid)
      throw new InvalidRequestParameters("The provided code is incorrect");
    return true;
  }
}
