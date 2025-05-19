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
      title: "Folk Creatures of the World",
      description: "From the Wendigo to the Chaneque.",
      image: "https://picsum.photos/seed/folkcreatures/600/400",
      postType: "Folklore",
    },
    {
      title: "2D Animation Comeback",
      description: "Why hand-drawn is having a revival.",
      text: "Studios are revisiting traditional art with modern tools.",
      postType: "Animation",
    },
    {
      title: "Speedrunning Games for Glory",
      description: "Beating Zelda in 8 minutes?",
      link: "https://speedrun.com",
      postType: "Gaming",
    },
    {
      title: "Urban Legends Reimagined",
      description: "Classic horror stories in a modern twist.",
      text: "What if Bloody Mary had TikTok?",
      postType: "Paranormal",
    },
    {
      title: "Silent Films That Changed Cinema",
      description: "Before sound, there was shadow and light.",
      image: "https://picsum.photos/seed/silentfilm/600/400",
      postType: "Film",
    },
    {
      title: "AI in Tabletop RPGs",
      description: "When your dungeon master is synthetic.",
      link: "https://dnd-ai.io",
      postType: "Tech",
    },
    {
      title: "Fashion Icons of the Apocalypse",
      description: "Utility meets dystopian drip.",
      text: "Mad Max made shoulder pads cool again.",
      postType: "Fashion",
    },
    {
      title: "Creating Mythical Languages",
      description: "Beyond Elvish: Sound systems & syntax.",
      image: "https://picsum.photos/seed/conlangs/600/400",
      postType: "Worldbuilding",
    },
    {
      title: "Intro to Cryptozoology",
      description: "Study of hidden creatures.",
      text: "Bigfoot isn’t real. Or is he?",
      postType: "Paranormal",
    },
    {
      title: "Cinematic Universes Explained",
      description: "More than just Marvel.",
      link: "https://cinematicuniverse.net",
      postType: "Film",
    },
    {
      title: "Soundtracks That Define a Genre",
      description: "Music in sci-fi, fantasy, horror.",
      image: "https://picsum.photos/seed/soundtrack/600/400",
      postType: "Music",
    },
    {
      title: "The Lost Art of Cover Art",
      description: "How book covers used to sell stories.",
      text: "A dragon, a damsel, a dagger — you’re sold.",
      postType: "Design",
    },
    {
      title: "Glitch Art and Digital Decay",
      description: "When mistakes become masterpieces.",
      link: "https://glitchartists.org",
      postType: "Art",
    },
    {
      title: "Witch Trials in Pop Culture",
      description: "From Salem to Sabrina.",
      text: "Fear of women + superstition = history repeated.",
      postType: "History",
    },
    {
      title: "Synthwave: Nostalgia in Sound",
      description: "Why 80s music refuses to die.",
      image: "https://picsum.photos/seed/synthwave/600/400",
      postType: "Music",
    },
    {
      title: "Virtual Reality Storytelling",
      description: "Narratives you can walk through.",
      link: "https://vrnarratives.org",
      postType: "Tech",
    },
    {
      title: "Aliens and Ancient Civilizations",
      description: "Was it aliens? Probably not. But maybe.",
      text: "It’s all in the architecture.",
      postType: "Mythology",
    },
    {
      title: "Designing for Dystopia",
      description: "Fictional worlds and brutal user interfaces.",
      image: "https://picsum.photos/seed/dystopiadesign/600/400",
      postType: "UX",
    },
    {
      title: "The Anti-Magic Movement",
      description: "When spells are outlawed, only rebels remain.",
      text: "Magic comes with a cost, especially political.",
      postType: "Fantasy",
    },
    {
      title: "Prophecy or Plot Device?",
      description: "How visions of the future drive stories.",
      link: "https://storystructures.com/prophecies",
      postType: "Writing",
    },
  ];

  const created = await Recommendation.insertMany(
    recommendations.map((rec) => ({ ...rec, creator: admin._id }))
  );

  console.log(` ${created.length} recommendations seeded`);
  process.exit(0);
};

seed();
