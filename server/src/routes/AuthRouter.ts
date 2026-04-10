import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { verify } from "node:crypto";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class AuthRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);
    router.post(
      "/refresh",
      AuthMiddleware.verifyRefreshToken,
      AuthController.refresh,
    );
    return router;
  }
}
