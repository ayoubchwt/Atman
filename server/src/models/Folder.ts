import mongoose, { model, Schema, Document } from "mongoose";

export interface IFolder extends Document {
  userId: mongoose.Types.ObjectId;
  label: string;
}
const FolderSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    label: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true },
);
export default model<IFolder>("Folder", FolderSchema);
