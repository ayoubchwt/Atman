import { Router } from "express";
import { NoteController } from "../controllers/NoteController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class NoteRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.get("/", AuthMiddleware.verifyAccessToken, NoteController.getNotes);
    router.get(
      "/shared",
      AuthMiddleware.verifyAccessToken,
      NoteController.getSharedNotes,
    );
    router.get(
      "/shared-with",
      AuthMiddleware.verifyRefreshToken,
      NoteController.getSharedWith,
    );
    router.get(
      "/search",
      AuthMiddleware.verifyAccessToken,
      NoteController.getNotesByTitle,
    );
    router.post(
      "/share",
      AuthMiddleware.verifyAccessToken,
      NoteController.createInvite,
    );
    router.post(
      "/update-invite-status",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateInviteStatus,
    );
    router.post(
      "/ai/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.getAiResponse,
    );
    router.get(
      "/folder/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.getByFolder,
    );
    router.post(
      "/",
      AuthMiddleware.verifyAccessToken,
      NoteController.createNote,
    );
    router.patch(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateNote,
    );
    router.delete(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.deleteNote,
    );
    return router;
  }
}
