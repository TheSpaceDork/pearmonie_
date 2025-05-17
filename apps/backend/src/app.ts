import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import { configureCloudinary } from "./config/cloudinary";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
configureCloudinary();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
