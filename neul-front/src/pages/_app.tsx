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
import RoleGuard from "@/components/RoleGuard";
import Head from "next/head";
import axios from "axios";
import SystemDown from "@/components/SystemDown";

// _app.tsx
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isChatPage = router.pathname === "/chat";

  // 서버 상태 체크
  const [isServerDown, setIsServerDown] = useState(false);

  // // 로딩중 컴포넌트 추가
  const [loading, setLoading] = useState(true);

  // 서버 체크
  const checkServer = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/health`
      ); // 백엔드의 헬스 체크
      // 응답이 200이고 ok가 true일 때만 서버 정상으로 판단
      if (res.status === 200 && res.data.ok === true) {
        setIsServerDown(false);
      } else {
        setIsServerDown(true);
      }
    } catch (error) {
      setIsServerDown(true);
    }
  };

  useEffect(() => {
    checkServer();
    // 30초마다 서버 상태 확인
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  // router가 변경될때 Loading 컴포넌트 표시
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router]);

  // 로그인 상태 확인 및 자동 로그아웃 처리
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("access_token");
      if (!token && isLoggedIn) {
        // console.log("access_token 없음 → 자동 로그아웃");
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
  const protectedPathsForHelper = [
    "/activity",
    "/helper",
    "/status",
    "/chat",
    // "/program",
    // "/mypage",
  ];

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
      {isServerDown ? (
        <SystemDown />
      ) : (
        <ThemeProvider theme={theme}>
          <Head>
            <title>Neul</title>
          </Head>

          <div className="layout-wrapper">
            <Header />

            <div
              style={{
                paddingTop: isChatPage ? "0px" : "64px",
              }}
            >
              {loading ? <Loading /> : guardedComponent}
            </div>

            <Footer />
          </div>
        </ThemeProvider>
      )}
    </>
  );
}
