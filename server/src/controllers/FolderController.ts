import { NextFunction, Request, Response } from "express";
import { FolderService } from "../services/FolderService";
import { createFolderDto } from "../dtos/FolderDTOs";
export class FolderController {
  public static async createFolder(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const createFolderDto = request.body as createFolderDto;
      const result = await FolderService.createFolder(userId, createFolderDto);
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async getFolders(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const result = await FolderService.getFolders(userId);
      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  public static async deleteFolder(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = request.user.id;
      const folderId = request.params.id as string;
      await FolderService.deleteFolder(userId, folderId);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
