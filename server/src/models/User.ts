import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
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
    },
    premium: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserShema);
