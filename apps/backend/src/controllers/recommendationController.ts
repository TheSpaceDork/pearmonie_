// controllers/recommendationController.ts
import { Request, Response } from "express";
import Recommendation from "../models/Recommendation";
import { uploadToCloudinary } from "../middleware/uploadImage";
import User from "../models/User";

export const createRecommendation = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file ? await uploadToCloudinary(req) : null;

    const { title, description, text, link, postType } = req.body;

    if (!title || !postType) {
      res.status(400).json({ message: "Title and category are required" });
      return;
    }

    const content = await Recommendation.create({
      title,
      description,
      text,
      link,
      postType,
      image: imageUrl,

      creator: (req as any).user.id,
    });

    res.status(201).json({
      success: true,
      message: "Content created",
      data: content,
    });
  } catch (err) {
    console.error("Error creating recommendation:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create content" });
  }
};

export const getAllRecommendations = async (req: Request, res: Response) => {
  try {
    const recommendations = await Recommendation.find()
      .sort({ createdAt: -1 })
      .populate("creator", "name email");

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch content" });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  const { id } = req.params; // recommendation ID
  const userId = (req as any).user.id;

  try {
    const recommendation = await Recommendation.findById(id);
    if (!recommendation) return res.status(404).json({ message: "Not found" });

    const isLiked = recommendation.likes.includes(userId);

    if (isLiked) {
      recommendation.likes = recommendation.likes.filter(
        (uid) => uid.toString() !== userId
      );
    } else {
      recommendation.likes.push(userId);
    }

    await recommendation.save();

    res.status(200).json({
      success: true,
      message: isLiked ? "Unliked" : "Liked",
      likes: recommendation.likes,
    });
  } catch (err) {
    res.status(500).json({ message: "Toggle like failed", error: err });
  }
};

export const addComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = (req as any).user.id;

  try {
    const recommendation = await Recommendation.findById(id);
    if (!recommendation) return res.status(404).json({ message: "Not found" });

    const user = await User.findById(userId).select("name");
    if (!user) return res.status(404).json({ message: "User not found" });

    recommendation.comments.unshift({
      user: userId,
      name: user.name,
      text,
    });

    await recommendation.save();

    res.status(201).json({
      success: true,
      message: "Comment added",
      comments: recommendation.comments,
    });
  } catch (err) {
    res.status(500).json({ message: "Add comment failed", error: err });
  }
};

export const trackView = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recommendation = await Recommendation.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!recommendation) return res.status(404).json({ message: "Not found" });

    res.status(200).json({
      success: true,
      message: "View tracked",
      views: recommendation.views,
    });
  } catch (err) {
    res.status(500).json({ message: "Track view failed", error: err });
  }
};
