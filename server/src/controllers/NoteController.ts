import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services/NoteService";
import { CreateNoteDto, NoteResponseDto, UpdateNoteDto } from "../dtos/NoteDTO";
import { mock } from "node:test";

export class NoteController {
  public static async createNote(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const mockUserId = request.user.id;
      const createNoteDto = request.body as CreateNoteDto;
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
      const mockUserId = request.user.id;
      const result = await NoteService.getNotes(mockUserId);
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
      const mockUserId = request.user.id;
      const noteId = request.params.id as string;
      const result = await NoteService.getNoteById(noteId, mockUserId);
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
      const mockUserId = request.user.id;
      const noteId = request.params.id as string;
      const updateNoteDto = request.body as UpdateNoteDto;
      const result = await NoteService.updateNote(
        noteId,
        mockUserId,
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
    const mockUserId = request.user.id;
    const noteId = request.params.id as string;
    await NoteService.deleteNote(noteId, mockUserId);
    response.status(204).send();
  }
}
