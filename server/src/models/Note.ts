import mongoose, { Schema, model, Document } from "mongoose";

export interface INote extends Document {
  id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  tags?: string[];
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
    tags: {
      type: [Schema.Types.String],
      default: [],
      required: false,
    },
  },
  { timestamps: true },
);

export default model<INote>("Note", NoteSchema);
