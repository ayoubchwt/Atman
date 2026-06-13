import { AppError } from "../utlis/AppError";

export class NoteInviteNotFoundException extends AppError {
  constructor(message: string = "Note invite not found") {
    super(message, 404);
  }
}
