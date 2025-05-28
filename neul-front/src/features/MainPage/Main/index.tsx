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
import { notification } from "antd";
// import { useCartStore } from "@/stores/useCartStore";

//main page component
const MainPage = () => {
  const router = useRouter();
  const { login, user } = useAuthStore();
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [dateslist, setDateslist] = useState([]); //유저에 해당하는 apply 테이블 리스트

  //현재 날짜 가지고 오기
  const today = new Date();
  //yyyy-mm-dd 형식
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
            notification.info({
              message: "추가 정보 입력",
              description:
                "소셜로그인 사용자는 추가 정보 등록 후 서비스를 이용하실 수 있습니다. 추가 정보 입력 페이지로 이동합니다.",
            });
            router.replace("/moreinfo", undefined, { shallow: true }); // 추가 정보 이동
          } else {
            router.replace("/", undefined, { shallow: true }); // 메인 이동
          }
        });
      }
    }
  }, [router.isReady, router.query, isTokenProcessed]);

  //상위 멘트 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setListIndex((prevIndex) => (prevIndex + 1) % list.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  //현재 날짜와 비교하여 요청 보내기
  useEffect(() => {
    //console.log("for", formattedDate);
    const userId = user?.id;

    if (!userId) return;

    //user id에 해당하는 apply행 전체 가지고 오기
    axiosInstance
      .get("/matching/usercheck", { params: { userId: userId } })
      .then((res: any) => {
        const data = res.data;
        //console.log("Data", data);

        if (data.length === 0) {
          return;
        } else {
          data.forEach((element: any) => {
            if (element.dates) {
              const datasarr = element.dates.split(",");
              const lastday = datasarr[datasarr.length - 1];
              //console.log("E", lastday);
              //현제 날짜와 마지막 날을 비교해서 오늘 날짜가 더 클 경우 삭제 요청
              // const isPast = new Date(formattedDate) > new Date(lastday); 오류일 경우 사용
              if (formattedDate > lastday) {
                const id = element.id;
                const adminId = element.adminId;

                axiosInstance
                  .post("/matching/deletematch", {
                    data: { userId: userId, adminId, id },
                  })
                  .then((res) => {
                    //console.log("요청 성공");
                  });
              }
            }
          });
          setDateslist(data);
        }
      });

    //console.log("uesrid", userId);
  }, [user]);

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
