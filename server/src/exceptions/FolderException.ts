import { AppError } from "../utlis/AppError";

export class FolderNotFoundExceeption extends AppError {
  constructor(message: string = "The requested Note was not found") {
    super(message, 404);
  }
}
