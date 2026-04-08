import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services/NoteService";

export class NoteController {
    public static async createNote(request: Request, response: Response, next: NextFunction) {
        try {
            const mockUserId = "123456";
            const createNoteDto = request.body;
            const result = await NoteService.createNote(mockUserId, createNoteDto);
            return response.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    public static async getNotes(request: Request, response: Response, next: NextFunction) {
        try {
            const mockUserId = "123456";
            const result = await NoteService.getNotes(mockUserId);
            return response.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}