import clsx from "clsx";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//component
import { MainPageStyled } from "./styled";
import IntroSection from "../IntroSection";
import Advertising from "@/features/Advertising";

import axiosInstance from "@/lib/axios";

// zustand
import { useAuthStore } from "@/stores/useAuthStore";

//main page component
const MainPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  // 소셜로그인 토큰 저장
  useEffect(() => {
    if (router.isReady && !isTokenProcessed) {
      const { snsAccess, snsRefresh } = router.query;

      if (typeof snsAccess === "string" && typeof snsRefresh === "string") {
        // 1. 쿠키 저장
        Cookies.set("access_token", snsAccess);
        Cookies.set("refresh_token", snsRefresh);
        setIsTokenProcessed(true);

        // URL에서 쿼리스트링 제거
        router.replace("/", undefined, { shallow: true });

        // // 2. axiosInstance에 토큰 헤더 반영 (선택적 수동 세팅)
        // axiosInstance.defaults.headers.Authorization = `Bearer ${snsAccess}`;

        // // 3. 유저 정보 요청 후 zustand에 저장
        // axiosInstance.get("/auth/me").then((res) => {
        //   login(res.data); // <- zustand에 유저 저장
        //   setIsTokenProcessed(true);

        //   // URL에서 쿼리스트링 제거
        //   router.replace("/", undefined, { shallow: true });
        // });
      }
    }
  }, [router.isReady, router.query, isTokenProcessed]);

  return (
    <MainPageStyled className={clsx("MainPage_main_wrap")}>
      <IntroSection /> {/* banner + navigator */}
      <Advertising /> {/* 광고 */}
    </MainPageStyled>
  );
};

export default MainPage;
