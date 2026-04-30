import { Router } from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { UserController } from "../controllers/UserController";

export class UserRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.get("/", AuthMiddleware.verifyAccessToken, UserController.getUser);
    return router;
  }
}
