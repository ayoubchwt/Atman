import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services/NoteService";
import { NoteResponseDto } from "../dtos/NoteDTO";

export class NoteController {
  public static async createNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const mockUserId = "123456";
      const createNoteDto = request.body;
      const result = await NoteService.createNote(mockUserId, createNoteDto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async getNotes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const mockUserId = "123456";
      const result = await NoteService.getNotes(mockUserId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async updateNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const mockUserId = "123456";
      const createNoteDto = request.body;
      const result = await NoteService.createNote(mockUserId, createNoteDto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const mockUserId = "123456";
    await NoteService.deleteNote(request.body.id, mockUserId);
    response.status(204);
  }
}
