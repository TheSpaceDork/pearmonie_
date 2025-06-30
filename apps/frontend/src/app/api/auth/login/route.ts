import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "../../../../../lib/models/User";
import { dbConnect } from "../../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    // DB connection with error check
    try {
      await dbConnect();
    } catch (dbErr) {
      console.error("Database connection failed:", dbErr);
      return NextResponse.json(
        { message: "DB connection failed" },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials: user not found" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials: password mismatch" },
        { status: 400 }
      );
    }

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
      // @ts-expect-error set doesn't exist on type blah blah...idk why it doesn't go away
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

    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err: unknown) {
    console.error("Unexpected login error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown server error";

    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    );
  }
}
