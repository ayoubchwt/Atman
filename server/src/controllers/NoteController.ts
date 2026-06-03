import { NextFunction, Request, Response } from "express";
import { NoteService } from "../services/NoteService";
import {
  CreateNoteDto,
  NoteAiRequestDto,
  UpdateNoteDto,
} from "../dtos/NoteDTO";
import { SharedNoteService } from "../services/SharedNoteService";
import {
  NoteInviteDto,
  UpdateInviteRoleDto,
  UpdateInviteStatusDto,
} from "../dtos/SharedNoteDTO";

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
    try {
      const userId = request.user.id;
      const noteId = request.params.id as string;
      await NoteService.deleteNote(noteId, userId);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  public static async getAiResponse(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const dto = request.body as NoteAiRequestDto;
      const noteId = request.params.id as string;
      const result = await NoteService.getAiResponse(noteId, dto);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async createInvite(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const noteInviteDto = request.body as NoteInviteDto;
      await SharedNoteService.createInvite(userId, noteInviteDto);
      response.status(201).send();
    } catch (error) {
      next(error);
    }
  }
  public static async getSharedNotes(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await SharedNoteService.getSharedNotes(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async updateInviteStatus(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const updateNoteInviteStatusDto = request.body as UpdateInviteStatusDto;
      await SharedNoteService.updateInviteStatus(
        userId,
        updateNoteInviteStatusDto,
      );
      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
  public static async getSharedWith(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = request.user.id;
    const noteId = request.params.id as string;
    const result = await SharedNoteService.getSharedWith(userId, noteId);
    response.status(200).json(result);
    try {
    } catch (error) {
      next(error);
    }
  }
  public static async getInvites(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const noteId = request.params.id as string;
      const result = await SharedNoteService.getNoteInvites(userId, noteId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async updateInviteRole(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const updateInviteRoleDto = request.body as UpdateInviteRoleDto;
      await SharedNoteService.updateInviteRole(userId, updateInviteRoleDto);
      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
  public static async deleteInvite(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const inviteId = request.params.id as string;
      await SharedNoteService.deleteInvite(userId, inviteId);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
  public static async getInviteNotifications(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await SharedNoteService.getInviteNotifications(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
