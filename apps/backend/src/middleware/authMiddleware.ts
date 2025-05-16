import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload & {
      id: string;
      role: string;
    };

    (req as any).user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};
