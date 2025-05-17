import express, { RequestHandler } from "express";

import {
  addComment,
  getAllRecommendations,
  toggleLike,
  trackView,
} from "../controllers/recommendationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/recommendations", authMiddleware, getAllRecommendations);
router.post(
  "/recommendations/:id/like",
  authMiddleware,
  toggleLike as RequestHandler
);
router.post(
  "/recommendations/:id/comment",
  authMiddleware,
  addComment as RequestHandler
);
router.post("/recommendations/:id/view", trackView as RequestHandler);

export default router;
