import mongoose, { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  premium: boolean;
}

const UserShema: Schema = new Schema(
  {
    firstName: Schema.Types.String,
    lastName: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String,
    premium: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserShema);
