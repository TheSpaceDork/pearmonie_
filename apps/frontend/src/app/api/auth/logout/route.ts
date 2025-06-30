import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();

    // Clear the "token" cookie
    // @ts-expect-error: next/headers types are missing `.delete` for cookies in App Router
    cookieStore.delete("token");

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
