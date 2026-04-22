import nodemailer from "nodemailer";
import { BadGateway } from "../exceptions/AuthException";
export class EmailUtils {
  private static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.PORT),
    secure: process.env.EMIAL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASSWORD_USER,
    },
  });
  public static async sendMail(email: string, code: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Atman Team <${process.env.EMAIL_HOST}>"`,
        to: email,
        subject: `Your Password Reset Code`,
        text: `Your password reset code is : ${code}`,
        html: `<b>Your password reset code is : ${code}</b>`,
      });
      console.log(`email has been sent successfully to ${email}`);
    } catch (error) {
      console.error(`Error sending mail to ${email} : `, error);
      throw new BadGateway("Failed to send email. Please try again later.");
    }
  }
}
