import mongoose, { Document, Schema, model } from "mongoose";
export interface INoteInvite extends Document {
  noteId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  role: "editor" | "viewer";
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
const NoteInviteSchema: Schema = new Schema({
  noteId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Note",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  role: {
    type: Schema.Types.String,
    enum: ["viewer", "editor"],
    required: true,
    default: "viewer",
  },
  status: {
    type: Schema.Types.String,
    enum: ["pending", "accepted", "rejected"],
    required: true,
    default: "pending",
  },
});
export default model<INoteInvite>("NoteInvite", NoteInviteSchema);
