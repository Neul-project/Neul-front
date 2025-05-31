// 서버에서 실행되는 파일임, 브라우저 전용 객체 사용 불가
import { NextRequest, NextResponse } from "next/server";

// 로그인 없이 접근 가능한 경로 목록
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/join",
  "/findid",
  "/findpw",
  "/moreinfo",
];

// 정적 파일이나 API 요청인지 확인
function isPublicFile(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[^/]+$/) // 정적 파일 (.js, .css, .png 등)
  );
}

//PUBLIC_PATHS 내 경로를 제외한 모든 경로에 로그인 시 발급되는 토큰의 유무를 검사
export default function middleware(req: NextRequest) {
  // console.log("✅ middleware 실행됨");

  const { pathname } = req.nextUrl;
  const access_token = req.cookies.get("access_token")?.value;

  // 1. 정적 파일은 건너뜀
  if (isPublicFile(pathname)) return NextResponse.next();

  // 2. PUBLIC_PATHS 토큰 없어도 허용
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  if (isPublic) return NextResponse.next();

  // 3. 로그인 안 된 경우 → 로그인 페이지로 리다이렉트
  if (!access_token || access_token.trim() === "") {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("reason", "auth");

    // console.log("Redirecting to:", loginUrl.toString());
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

// 어떤 경로에 미들웨어 적용될지 설정
export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
};
