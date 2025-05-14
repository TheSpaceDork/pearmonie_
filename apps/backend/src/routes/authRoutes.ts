import express from "express";
import { login, logout, register } from "../controllers/authController";

const router = express.Router();

router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.get("/logout", logout as express.RequestHandler);

export default router;
