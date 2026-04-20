import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string | null;
  premium: boolean;
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
    refreshToken: {
      type: Schema.Types.String,
      select: false,
      default: null,
    },
    premium: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserShema);
