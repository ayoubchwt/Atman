import express from "express";
import connectDB from "./src/config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthRouter } from "./src/routes/AuthRouter";
import { ErrorMiddleware } from "./src/middleware/ErrorMiddleware";
import { NoteRouter } from "./src/routes/NoteRouter";
import { FolderRouter } from "./src/routes/FolderRoutes";
import { UserRouter } from "./src/routes/UserRouter";
import socket from "./src/config/socket";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = socket(app);
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
