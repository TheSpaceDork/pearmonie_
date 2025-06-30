import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../../../../../lib/models/User";
import { dbConnect } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    try {
      await dbConnect();
    } catch (dbErr) {
      console.error("Database connection failed:", dbErr);
      return NextResponse.json(
        { message: "DB connection failed" },
        { status: 500 }
      );
    }

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET in environment");
      return NextResponse.json(
        { message: "JWT secret not configured" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const cookieStore = cookies();
    try {
      // @ts-expect-error: Cookie API type conflict
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 2 * 24 * 60 * 60,
        path: "/",
      });
    } catch (cookieErr) {
      console.error("Failed to set cookie:", cookieErr);
      return NextResponse.json(
        { message: "Failed to set cookie" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Unexpected registration error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Unknown server error";

    return NextResponse.json(
      { message: "Registration failed", error: errorMessage },
      { status: 500 }
    );
  }
}
