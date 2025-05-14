import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};
