import clsx from "clsx";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { list } from "./comment";

//component
import { MainPageSide, MainPageStyled } from "./styled";
import IntroSection from "../IntroSection";
import Advertising from "@/features/Advertising";

// zustand
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";

//main page component
const MainPage = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  const [listIndex, setListIndex] = useState(0);

  // 소셜로그인 토큰 저장
  useEffect(() => {
    if (router.isReady && !isTokenProcessed) {
      const { snsAccess, snsRefresh } = router.query;

      if (typeof snsAccess === "string" && typeof snsRefresh === "string") {
        // 1. 쿠키 저장
        Cookies.set("access_token", snsAccess);
        Cookies.set("refresh_token", snsRefresh);
        setIsTokenProcessed(true);

        // 2. axiosInstance에 토큰 헤더 적용
        axiosInstance.defaults.headers.Authorization = `Bearer ${snsAccess}`;

        // 3. 유저 정보 요청
        axiosInstance.get("/auth/me").then((res) => {
          // console.log("소셜로그인 zustand", res.data);

          const userData = res.data;
          login(res.data); // zustand 저장

          // 4. 추가정보 여부 판단
          if (!userData.name || userData.name.trim() === "") {
            alert(
              "소셜로그인 사용자는 추가 정보 등록 후 서비스를 이용하실 수 있습니다. 추가 정보 입력 페이지로 이동합니다."
            );
            router.replace("/moreinfo", undefined, { shallow: true }); // 추가 정보 이동
          } else {
            router.replace("/", undefined, { shallow: true }); // 메인 이동
          }
        });
      }
    }
  }, [router.isReady, router.query, isTokenProcessed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setListIndex((prevIndex) => (prevIndex + 1) % list.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MainPageSide>{list[listIndex]}</MainPageSide>
      <MainPageStyled className={clsx("MainPage_main_wrap")}>
        <IntroSection />
        <Advertising />
      </MainPageStyled>
    </>
  );
};

export default MainPage;
