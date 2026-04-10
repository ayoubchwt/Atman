import express from "express";
import connectDB from "./src/config/db";
import cookieParser from "cookie-parser";
import { AuthRouter } from "./src/routes/AuthRouter";

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRouter.getRoutes());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
