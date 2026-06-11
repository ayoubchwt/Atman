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
      "/search",
      AuthMiddleware.verifyAccessToken,
      NoteController.getNotesByTitle,
    );
    router.get(
      "/invite-notifications",
      AuthMiddleware.verifyAccessToken,
      NoteController.getInviteNotifications,
    );
    router.get(
      "/shared-with/:id",
      AuthMiddleware.verifyRefreshToken,
      NoteController.getSharedWith,
    );
    router.get(
      "/invites/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.getInvites,
    );
    router.get(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.getNote,
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
    router.patch(
      "/update-invite-role",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateInviteRole,
    );
    router.post(
      "/ai/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.getAiResponse,
    );
    router.post(
      "/update-invite-status",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateInviteStatus,
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
      "/",
      AuthMiddleware.verifyAccessToken,
      NoteController.updateNote,
    );
    router.delete(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.deleteNote,
    );
    router.delete(
      "/delete-invite/:id",
      AuthMiddleware.verifyAccessToken,
      NoteController.deleteInvite,
    );
    router.post(
      "/remove-collaborator",
      AuthMiddleware.verifyAccessToken,
      NoteController.removeCollaborator,
    );
    return router;
  }
}
