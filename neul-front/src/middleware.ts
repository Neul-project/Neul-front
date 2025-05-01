// 서버에서 실행되는 파일임, 브라우저 전용 객체 사용 불가
import { NextRequest, NextResponse } from "next/server";

// 로그인 없이 접근 가능한 경로 목록
const PUBLIC_PATHS = ["/", "/login", "/join"];

// 정적 파일이나 API 요청인지 확인
function isPublicFile(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(.*)$/) // 정적 파일 (.js, .css, .png 등)
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicFile(pathname)) {
    return NextResponse.next(); // 건너뛰기
  }

  const access_token = req.cookies.get("access_token")?.value;

  // 메인, 로그인, 회원가입 페이지는 토큰 없어도 접근 허용
  const isPublic = PUBLIC_PATHS.some((path) => pathname === path);

  if (!isPublic && !access_token) {
    const loginUrl = new URL("/login", req.url);

    // 리다이렉트할 URL에 쿼리 문자열을 붙임 / pages -> login에서 처리
    loginUrl.searchParams.set("reason", "auth");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// // 로그인 보호가 필요한 경로 리스트
// const protectedRoutes = [
//   "/mywrite",
//   "/myfavorite",
//   "/alert",
//   "/cashhistory",
//   "/mypage",
//   "/mycomment",
//   "/newwrite",
// ];

// export const middleware = (req: NextRequest) => {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("accessToken");

//   // 보호된 페이지에 접근 중인데, 토큰이 없으면 로그인으로 리디렉트
//   const needsAuth = protectedRoutes.some((path) => pathname.startsWith(path));
//   if (needsAuth && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
//   return NextResponse.next();
// };

// export const config = {
//   matcher: [
//     "/mywrite",
//     "/myfavorite",
//     "/alert",
//     "/cashhistory",
//     "/mypage",
//     "/mycomment",
//     "/newwrite",
//   ],
// };
