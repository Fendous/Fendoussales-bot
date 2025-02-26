import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const authRoutes: String[] = [
    "/aichat",
    "/crm",
    "/pm",
    "/settings",
    "/billing",
    "/account",
    "/integrations",
  ];

  // Check if the route requires authentication and redirect if not authenticated
  if (token && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/log-in", req.nextUrl));
  }

  if (!token && ["/", "/log-in", "/registeration"].includes(path)) {
    return NextResponse.redirect(new URL("/aichat", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/api/:path*", // Match all API routes
    "/",
    "/log-in",
    "/registration",
    "/aichat",
    "/pm",
    "/crm",
    "/test",
    "/((?!static|.*\\..*|_next).*)",
  ],
};
