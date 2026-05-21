import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and auth API routes through without a check
  if (pathname === "/members/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("members_auth")?.value;
  const expectedToken = process.env.MEMBERS_TOKEN;

  if (!token || !expectedToken || token !== expectedToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/members/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/members/:path*"],
};
