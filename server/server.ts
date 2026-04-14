import express from "express";
import connectDB from "./src/config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthRouter } from "./src/routes/AuthRouter";
import { ErrorMiddleware } from "./src/middleware/ErrorMiddleware";

const app = express();
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
app.use(ErrorMiddleware.handle);
