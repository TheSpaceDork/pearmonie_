import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Recommendation from "../models/Recommendation";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(" MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const seed = async () => {
  await connectDb();

  // // deletes all recommendations
  // await Recommendation.deleteMany();
  // console.log(" Cleared old recommendations");

  let admin = await User.findOne({ email: "admin@example.com" });

  if (!admin) {
    const password = await bcrypt.hash("admin123", 10);
    admin = await User.create({
      name: "Seed Admin",
      email: "admin@example.com",
      password,
      role: "admin",
    });
    console.log(" Admin created:", admin.email);
  }

  const recommendations = [
    {
      title: "Microcopy That Converts",
      description: "Learn how short text can boost your UX.",
      text: "Use friendly and helpful microcopy.",
      link: "https://uxplanet.org",
      image: "https://picsum.photos/seed/ux2/600/400",
      postType: "UX Writing",
    },
    {
      title: "Intro to Responsive Design",
      description: "Why your site needs to work on all screens.",
      text: "Media queries, Flexbox, and Grid are your friends.",
      link: "https://responsive.com",
      image: "https://picsum.photos/seed/responsive/600/400",
      postType: "Development",
    },
    {
      title: "Top Marketing Campaigns in 2024",
      description: "What made them click?",
      text: "Authentic storytelling + solid design = success.",
      image: "https://picsum.photos/seed/marketing/600/400",
      postType: "Marketing",
    },
    {
      title: "Comic Design Basics",
      description: "Storyboarding, framing, and pacing tips.",
      text: "Use consistent layouts and strong characters.",
      image: "https://picsum.photos/seed/comics/600/400",
      postType: "Comic book",
    },
    {
      title: "Effective Call-To-Actions",
      description: "Drive user action with smart CTAs.",
      link: "https://calltoactionexamples.com",
      image: "https://picsum.photos/seed/cta/600/400",
      postType: "Marketing",
    },
    {
      title: "Building a Fantasy World",
      description: "Naming, lore, and believable magic systems.",
      text: "Start small and expand logically.",
      image: "https://picsum.photos/seed/fantasy1/600/400",
      postType: "Fantasy",
    },
    {
      title: "Social Media Growth Hacks",
      description: "What works on TikTok, X, and Instagram?",
      image: "https://picsum.photos/seed/social1/600/400",
      postType: "Social Post",
    },
    {
      title: "Storytelling for UX",
      description: "Guide users through your interface with intent.",
      text: "Each screen should have a goal.",
      image: "https://picsum.photos/seed/ux3/600/400",
      postType: "UX Writing",
    },
    // ✅ Below: 4 WITHOUT images
    {
      title: "Blog Post Formatting Tips",
      description: "How to make long reads digestible.",
      postType: "Blog post",
      text: "Break with headings, bullets, and visuals.",
    },
    {
      title: "Minimalist Design Systems",
      description: "Less, but better.",
      postType: "Development",
      link: "https://minimalism.design",
    },
    {
      title: "Writing Relatable Dialogue",
      description: "What makes a character feel real?",
      postType: "Comic book",
      text: "Read it out loud. If it sounds awkward, fix it.",
    },
    {
      title: "Email Subject Lines that Get Opened",
      description: "The first impression matters most.",
      postType: "Marketing",
      text: "Test urgency, curiosity, and value.",
    },
  ];

  const created = await Recommendation.insertMany(
    recommendations.map((rec) => ({ ...rec, creator: admin._id }))
  );

  console.log(` ${created.length} recommendations seeded`);
  process.exit(0);
};

seed();
