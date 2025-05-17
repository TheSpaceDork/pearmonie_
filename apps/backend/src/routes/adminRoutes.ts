import express from "express";
import { createRecommendation } from "../controllers/recommendationController";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { upload } from "../middleware/uploadImage";

const router = express.Router();

router.post(
  "/recommendations",
  authMiddleware,
  upload.single("image"),
  authorizeRoles("admin"),
  createRecommendation
);
export default router;
