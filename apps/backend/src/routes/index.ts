import express from "express";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import editRoute from "./editRoute";
import recommendationRoutes from "./recommendationRoutes.ts";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/", editRoute);
router.use("/", recommendationRoutes);

export default router;
