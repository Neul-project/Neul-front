import clsx from "clsx";
import { MainPageStyled } from "./styled";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//component
import IntroSection from "../IntroSection";
import Advertising from "@/features/Advertising";

//main page component
const MainPage = () => {
  const router = useRouter();
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  // 소셜로그인 토큰 저장
  useEffect(() => {
    if (router.isReady && !isTokenProcessed) {
      const { snsAccess, snsRefresh } = router.query;

      if (typeof snsAccess === "string" && typeof snsRefresh === "string") {
        Cookies.set("access_token", snsAccess);
        Cookies.set("refresh_token", snsRefresh);
        setIsTokenProcessed(true);

        // URL에서 쿼리스트링 제거
        router.replace("/", undefined, { shallow: true });
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
