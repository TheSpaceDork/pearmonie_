import express from "express";
import authRoutes from "./authRoutes";
import adminRoutes from "./adminRoutes";
import editRoute from "./editRoute";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/", editRoute);

export default router;
