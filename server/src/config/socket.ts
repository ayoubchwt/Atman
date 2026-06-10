import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketAuthMiddleware } from "../middleware/SocketAuthMiddleware";
import { NoteService } from "../services/NoteService";
import { UpdateNoteDto } from "../dtos/NoteDTO";

export class SocketManager {
  private static io: Server;

  public static init = (app: Express) => {
    const server = createServer(app);
    this.io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
      },
    });
    this.io.use(SocketAuthMiddleware.verifyAccessToken);

    this.io.on("connection", (socket) => {
      const userId = socket.user.id;

      socket.on("join-note-room", async (noteId) => {
        try {
          const access = await NoteService.checkAccess(noteId, userId);
          if (!access)
            return socket.emit("note-error", "Note not found or access denied");
          socket.rooms.forEach((room) => {
            if (room !== socket.id && room !== noteId) socket.leave(room);
          });
          socket.join(noteId);
        } catch (error) {
          return socket.emit("note-error", "Internal real-time stream error");
        }
      });
    });
    return server;
  };
  public static getIo() {
    if (!this.io) throw new Error("Failed to initialize the socket");
    return this.io;
  }
}
