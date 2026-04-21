import mongoose, { Document, model, Schema } from "mongoose";

export interface IRefreshToken extends Document {
  id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  token: string;
}
const RefreshTokenSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: Schema.Types.String,
    required: true,
  },
});
export default model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
