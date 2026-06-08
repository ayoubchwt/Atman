import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SocketAuthMiddleware } from "../middleware/SocketAuthMiddleware";
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
    socket.on("join-note-room", (noteId) => {
      socket.join(noteId);
    });
    socket.on("sync-note-edit", (data) => {
      const { noteId, title, content } = data;
      socket.to(noteId).emit("note-mutated", { content, title });
    });
  });
  return server;
};
export default socket;
