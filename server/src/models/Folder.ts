import mongoose, { model, Schema, Document } from "mongoose";

export interface IFolder extends Document {
  id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  label: string;
}
const FolderSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  label: {
    type: Schema.Types.String,
    required: true,
  },
});
export default model<IFolder>("Folder", FolderSchema);
