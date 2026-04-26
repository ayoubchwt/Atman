import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { FolderController } from "../controllers/FolderController";

export class FolderRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.get(
      "/",
      AuthMiddleware.verifyAccessToken,
      FolderController.getFolders,
    );
    router.post(
      "/",
      AuthMiddleware.verifyAccessToken,
      FolderController.createFolder,
    );
    router.patch(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      FolderController.updateFolder,
    );
    router.delete(
      "/:id",
      AuthMiddleware.verifyAccessToken,
      FolderController.deleteFolder,
    );
    return router;
  }
}
