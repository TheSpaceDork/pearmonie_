import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Block access to protected routes if no token
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect dashboard and all nested routes
};
