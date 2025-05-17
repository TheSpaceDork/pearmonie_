import express from "express";
import {
  createAdmin,
  getUser,
  login,
  logout,
  register,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
router.get("/logout", logout as express.RequestHandler);
router.get("/get-user", getUser as express.RequestHandler);
router.post("/create-admin", createAdmin as express.RequestHandler);

export default router;
