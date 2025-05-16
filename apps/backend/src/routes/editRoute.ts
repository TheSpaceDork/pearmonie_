import express from "express";
import { editUser } from "../controllers/editUser";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.put("/users/:id", authMiddleware, editUser);

export default router;
