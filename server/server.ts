import express from "express";
import connectDB from "./src/config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthRouter } from "./src/routes/AuthRouter";
import { ErrorMiddleware } from "./src/middleware/ErrorMiddleware";
import { NoteRouter } from "./src/routes/NoteRouter";
import { FolderRouter } from "./src/routes/FolderRoutes";
import { UserRouter } from "./src/routes/UserRouter";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
// socket io shit
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("connection opened", socket.id);

  socket.on("join-note-room", (noteId) => {
    console.log("inside the join event");
    socket.join(noteId);
  });
  socket.on("sync-note-edit", (data) => {
    const { noteId, title, content } = data;
    socket.to(noteId).emit("note-mutated", { content, title });
  });
  socket.on("disconnect", () => {
    console.log("user diconnected :", socket.id);
  });
});
io.on("disconnection", (socket) => {
  console.log("connection closed", socket.id);
});
connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRouter.getRoutes());
app.use("/api/note", NoteRouter.getRoutes());
app.use("/api/folder", FolderRouter.getRoutes());
app.use("/api/user", UserRouter.getRoutes());
app.use(ErrorMiddleware.handle);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`App is running on port ${PORT}`));
