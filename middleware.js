// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth-token");
  const { pathname } = req.nextUrl;

  // Allow requests to login page without token
  if (pathname.startsWith("/auth/login")) {
    return NextResponse.next();
  }

  // Redirect if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // Continue if authenticated
}

// Apply the middleware to protected routes
export const config = {
  matcher: ["/", "/dashboard", "/profile"], // Add your protected routes here
};
