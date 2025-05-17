import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    postType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    text: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        name: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recommendation", recommendationSchema);
