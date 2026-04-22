import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export class AuthRouter {
  public static getRoutes(): Router {
    const router = Router();
    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);
    router.post("/forgot-password", AuthController.forgotPassword);
    router.post("/verify-otp", AuthController.verifyOtp);
    router.post("/reset-password", AuthController.resetPassword);
    router.post(
      "/refresh",
      AuthMiddleware.verifyRefreshToken,
      AuthController.refresh,
    );
    router.post(
      "/logout",
      AuthMiddleware.verifyRefreshToken,
      AuthController.logout,
    );
    return router;
  }
}
