import { AppError } from "../utlis/AppError";

export class UserNotFoundException extends AppError {
  constructor(message = "User Not Found") {
    super(message , 404);
  }
}
