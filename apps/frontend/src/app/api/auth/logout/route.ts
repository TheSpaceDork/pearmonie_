import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Overwrite the token cookie with an expired one
    //   @ts-expect-error bad type i guess
    cookieStore.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0), // 👈 forces immediate expiration
      path: "/", // 👈 ensure it's cleared globally
    });

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Logout failed:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json(
      { message: "Logout failed", error: errorMessage },
      { status: 500 }
    );
  }
}
