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

// _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChatPage = router.pathname === "/chat";

  // 로딩중 컴포넌트 추가
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />

        <div
          style={{
            paddingTop: isChatPage ? "0px" : "64px",
          }}
        >
          {isLoading ? <Loading /> : <Component {...pageProps} />}
        </div>

        <Footer />
      </ThemeProvider>
    </>
  );
}
