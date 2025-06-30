import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { dbConnect } from "../../../../../lib/db";
import User from "../../../../../lib/models/User";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = cookies();
    //   @ts-expect-error  but repeated error
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
        id: string;
      };
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.id).select(
      "name email role createdAt"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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
    console.error("Failed to fetch user:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      { message: "Failed to fetch user", error: errorMessage },
      { status: 500 }
    );
  }
}
