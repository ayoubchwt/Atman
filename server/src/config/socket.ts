import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketAuthMiddleware } from "../middleware/SocketAuthMiddleware";
import { NoteService } from "../services/NoteService";
const socket = (app: Express) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });
  io.use(SocketAuthMiddleware.verifyAccessToken);

  io.on("connection", (socket) => {
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
    socket.on("sync-note-edit", async (data) => {
      try {
        const { noteId, title, content } = data;
        socket.to(noteId).emit("note-mutated", { content, title });
        const access = await NoteService.checkAccess(noteId, userId);
        if (!access || !access.canEdit)
          return socket.emit(
            "note-error",
            "You do not have permission to edit this note",
          );
        // update logic will go here
        socket.to(data.noteId).emit("note-updated", data.content);
      } catch (error) {
        return socket.emit("note-error", "Failed to process document edit");
      }
    });
  });
  return server;
};
export default socket;
