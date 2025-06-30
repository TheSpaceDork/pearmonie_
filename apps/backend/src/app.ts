import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import cookieParser from "cookie-parser";
import path from "path";
import { configureCloudinary } from "./config/cloudinary";
const allowedOrigins = ["http://localhost:3000", process.env.FRONTEND_ORIGIN];
dotenv.config({ path: path.resolve(__dirname, "../.env") });
configureCloudinary();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://pearmonie-assessment-frontend.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // return the actual origin string
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
