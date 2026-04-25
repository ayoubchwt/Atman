import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services/NoteService";
import { CreateNoteDto, UpdateNoteDto } from "../dtos/NoteDTO";

export class NoteController {
  public static async createNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const createNoteDto = request.body as CreateNoteDto;
      const result = await NoteService.createNote(userId, createNoteDto);
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
      const userId = request.user.id;
      const result = await NoteService.getNotes(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async getNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const noteId = request.params.id as string;
      const result = await NoteService.getNoteById(noteId, userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async getByFolder(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const folderId = request.params.id as string;
      const result = await NoteService.getNoteByFolder(folderId, userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async getNotesByTitle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const searchValue = request.query.searchValue as string;
      const result = await NoteService.getNoteByTitle(searchValue, userId);
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
      const userId = request.user.id;
      const noteId = request.params.id as string;
      const updateNoteDto = request.body as UpdateNoteDto;
      const result = await NoteService.updateNote(
        noteId,
        userId,
        updateNoteDto,
      );
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = request.user.id;
    const noteId = request.params.id as string;
    await NoteService.deleteNote(noteId, userId);
    response.status(204).send();
  }
}
