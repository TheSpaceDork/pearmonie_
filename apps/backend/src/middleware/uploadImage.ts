import multer from "multer";
import { Request } from "express";
import cloudinary from "../config/cloudinary";

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = async (
  req: Request
): Promise<string | null> => {
  if (!req.file) return null;

  const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
    "base64"
  )}`;

  const uploadResult = await cloudinary.uploader.upload(base64, {
    folder: "recommendations",
  });

  return uploadResult.secure_url;
};
