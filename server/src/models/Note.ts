import mongoose, { Schema, model, Document } from "mongoose";

export interface INote extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  folder: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const NoteSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: false,
    },
    content: {
      type: Schema.Types.String,
      required: false,
    },
    folder: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true },
);

export default model<INote>("Note", NoteSchema);
