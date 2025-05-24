import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import Header from "@/components/Header";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/useAuthStore";

import Loading from "@/components/Loading";
import Script from "next/script";
import RoleGuard from "@/components/RoleGuard";

// _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChatPage = router.pathname === "/chat";

  // // 로딩중 컴포넌트 추가
  // const [isLoading, setIsLoading] = useState(false);

  // // router가 변경될때 Loading 컴포넌트 표시
  // useEffect(() => {
  //   let timer: NodeJS.Timeout | null = null;

  //   const start = () => {
  //     // 항상 초기화
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       setIsLoading(true);
  //     }, 500); // 500ms 이상이면 로딩 보여주기
  //   };

  //   const end = () => {
  //     if (timer) {
  //       clearTimeout(timer);
  //       timer = null;
  //     }
  //     setIsLoading(false); // 무조건 꺼주기
  //   };

  //   router.events.on("routeChangeStart", start); // 이동 시작 감지
  //   router.events.on("routeChangeComplete", end); // 이동 완료 감지
  //   router.events.on("routeChangeError", end); // 이동 실패 감지

  //   return () => {
  //     router.events.off("routeChangeStart", start);
  //     router.events.off("routeChangeComplete", end);
  //     router.events.off("routeChangeError", end);
  //   };
  // }, [router]);

  // 로그인 상태 확인 및 자동 로그아웃 처리
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("access_token");
      if (!token && isLoggedIn) {
        console.log("access_token 없음 → 자동 로그아웃");
        logout();
      }
    };

    // 탭 포커스 시 토큰 체크
    window.addEventListener("focus", checkToken);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkToken();
    });

    // 컴포넌트 마운트 시 최초 1회 실행
    checkToken();

    return () => {
      // 브라우저 창이 활성화 되면 감지
      window.removeEventListener("focus", checkToken);
      // 현재 창이 유저한테 보이면 감지
      document.removeEventListener("visibilitychange", checkToken);
    };
  }, [isLoggedIn, logout]);

  // 도우미 접근 불가 경로
  const protectedPathsForHelper = ["/activity", "/helper", "/status"];

  // 현재 경로가 보호 대상인지 확인
  const isProtected = protectedPathsForHelper.some((path) =>
    router.pathname.startsWith(path)
  );

  // 보호 대상이면 <RoleGuard>로 감싸서 차단
  const guardedComponent = isProtected ? (
    <RoleGuard blockedRoles={["admin"]}>
      <Component {...pageProps} />
    </RoleGuard>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />

        <div
          style={{
            paddingTop: isChatPage ? "0px" : "64px",
          }}
        >
          {/* {isLoading ? <Loading /> : guardedComponent} */}
          {guardedComponent}
        </div>

        <Footer />
      </ThemeProvider>
    </>
  );
}
