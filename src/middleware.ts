// middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const loggedIn = req.cookies.get("logged_in")?.value === "true";
  if (!loggedIn) {
    const url =
      "https://github.com/login/oauth/authorize?client_id=Iv23liVTGpC7fMddM5Bk";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths to apply the middleware to
export const config = {
  matcher: ["/user/:path*"], // Apply middleware only to '/admin' routes
};
