// controllers/recommendationController.ts
import { Request, Response } from "express";
import Recommendation from "../models/Recommendation";

export const createRecommendation = async (req: Request, res: Response) => {
  try {
    //   Attach creator id here so the server knows who's creating the post
    const content = await Recommendation.create({
      ...req.body,
      creator: (req as any).user.id,
    });

    res.status(201).json({
      success: true,
      message: "Content created",
      data: content,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create content" });
  }
};
