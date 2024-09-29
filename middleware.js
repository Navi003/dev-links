import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth-token"); // Get the auth token from cookies
  const { pathname } = req.nextUrl; // Get the current path

  // Redirect authenticated users away from the login or signup page
  // if (
  //   token &&
  //   (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))
  // ) {
  //   return NextResponse.redirect(new URL("/", req.url)); // Redirect to home page if logged in
  // }

  // Allow requests to login or signup page without token
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup")
  ) {
    return NextResponse.next();
  }

  // Redirect if not authenticated and trying to access protected routes
  if (
    !token &&
    (pathname.startsWith("/") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/links") ||
      pathname.startsWith("/preview"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // Continue to the requested page if authenticated
}

// Apply the middleware to protected routes, login, and signup pages
export const config = {
  matcher: ["/auth/login", "/auth/signup", "/dashboard", "/profile", "/"], // Add your routes here
};
