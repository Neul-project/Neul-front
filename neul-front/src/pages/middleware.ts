// root에 middleware.ts 파일 생성
import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/", "/login"];

export default function middleware(req: NextRequest) {
  const access_token = req.cookies.get("access_token")?.value;

  const isProtectedPath =
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/profile");

  if (isProtectedPath && !access_token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
