import { NextFunction, Request, Response } from "express";

export class ErrorMiddleware {
  public static handle(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const status = error.statusCode || 500;
    const message = error.message || "Internal server error";
    response.status(status).json({
      status: status,
      message: message,
    });
  }
}
