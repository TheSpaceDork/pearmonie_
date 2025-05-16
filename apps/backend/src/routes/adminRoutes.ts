import express from "express";
import { createRecommendation } from "../controllers/recommendationController";

const router = express.Router();

router.post(
  "/create-recommendation",
  createRecommendation as express.RequestHandler
);
export default router;
