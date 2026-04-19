import { Router } from "express";
import { NoteController } from "../controllers/NoteController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class NoteRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.get(
      "/get",
      AuthMiddleware.verifyAccessToken,
      NoteController.getNotes,
    );
    router.post(
      "/add",
      AuthMiddleware.verifyAccessToken,
      NoteController.createNote,
    );
    router.patch(
      "/update/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateNote,
    );
    router.delete(
      "/delete/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.deleteNote,
    );
    return router;
  }
}
