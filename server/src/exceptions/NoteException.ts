import { AppError } from "../utlis/AppError";

export class NoteNotFoundException extends AppError {
    constructor(message: string = "The requested Note was not found") {
        super(message, 404);
    }
}
export class UnauthorizedNoteAccessException extends AppError {
    constructor(message: string = "The access to the requested Note is unauthorized") {
        super(message, 401);
    }
}