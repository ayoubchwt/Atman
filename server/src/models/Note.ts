import mongoose, { Schema, model, Document } from "mongoose";

export interface SharedWith {
  userId: mongoose.Types.ObjectId;
  role: "viewer" | "editor";
}
export interface INote extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  folder: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  sharedWith: SharedWith[];
}
const NoteSchema: Schema = new Schema(
  {
    userId: {
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
    sharedWith: [
      {
        _id: false,
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: Schema.Types.String,
          enum: ["editor", "viewer"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export default model<INote>("Note", NoteSchema);
