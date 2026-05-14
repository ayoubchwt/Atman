import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { UserController } from "../controllers/UserController";

export class UserRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.get("/", AuthMiddleware.verifyAccessToken, UserController.getUser);
    router.get(
      "/settings",
      AuthMiddleware.verifyAccessToken,
      UserController.getUserSettings,
    );
    router.patch(
      "/update-username",
      AuthMiddleware.verifyAccessToken,
      UserController.updateUserName,
    );
    router.patch(
      "/update-password",
      AuthMiddleware.verifyAccessToken,
      UserController.updateUserPassword,
    );
    router.post(
      "/sessions",
      AuthMiddleware.verifyAccessToken,
      UserController.incrementUserSessions,
    );
    router.post(
      "/update-email",
      AuthMiddleware.verifyAccessToken,
      UserController.updateUserEmail,
    );
    router.patch(
      "/confirm-update-email",
      AuthMiddleware.verifyAccessToken,
      UserController.confirmUpdateUserEmail,
    );
    router.post(
      "/delete",
      AuthMiddleware.verifyAccessToken,
      UserController.deleteUser,
    );
    router.post(
      "/confirm-delete",
      AuthMiddleware.verifyAccessToken,
      UserController.confirmDeleteUser,
    );
    return router;
  }
}
