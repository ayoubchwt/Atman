import { AppError } from "../utlis/AppError";

export class UserAlreadyExistException extends AppError {
  constructor(
    message: string = "This email is already linked to a existent user",
  ) {
    super(message, 400);
  }
}
export class UserNotFoundException extends AppError {
  constructor(message: string = "Invalid email or password") {
    super(message, 400);
  }
}
export class UnauthorizedException extends AppError {
  constructor(message: string = "Access denied") {
    super(message, 401);
  }
}
