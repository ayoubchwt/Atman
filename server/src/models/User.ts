import mongoose, { Schema, model, Document } from "mongoose";
import Note from "./Note";
import Folder from "./Folder";
import RefreshToken from "./RefreshToken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  sessions: number;
  refreshToken: string | null;
  OtpToken: string | null;
  OtpExpires: Date | null;
}

const UserShema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
      select: false,
    },
    sessions: {
      type: Schema.Types.Number,
      required: false,
    },
    refreshToken: {
      type: Schema.Types.String,
      select: false,
      default: null,
    },
    OtpToken: {
      type: Schema.Types.String,
      select: false,
      default: null,
    },
    OtpExpires: {
      type: Schema.Types.Date,
      select: false,
      default: null,
    },
  },
  { timestamps: true },
);
UserShema.pre("findOneAndDelete", async function () {
  const query = this.getQuery();
  const userId = query._id;
  await Promise.all([
    Note.deleteMany({ userId: userId }),
    Folder.deleteMany({ userId: userId }),
    RefreshToken.deleteMany({ userId: userId }),
  ]);
});
export default model<IUser>("User", UserShema);
