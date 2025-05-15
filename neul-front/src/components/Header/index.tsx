import clsx from "clsx";
import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//images
import logo from "@/assets/images/logo_small.png";

import { GrBook } from "react-icons/gr";
import { PiBellRinging } from "react-icons/pi";

import { useAuthStore } from "@/stores/useAuthStore";
import axiosInstance from "@/lib/axios";
import { notification } from "antd";

// 알림 더미 데이터
const dummyDate = [
  {
    id: 1,
    message: "match",
    isChecked: false, //확인 유무(확인 안 함)
    created_at: "2025-01-03",
  },
  {
    id: 2,
    message: "match_cancel",
    isChecked: false, //확인 유무(확인 안 함)
    created_at: "2025-01-03",
  },
  {
    id: 3,
    message: "pay",
    isChecked: false, //확인 유무(확인 안 함)
    created_at: "2025-01-03",
  },
  {
    id: 4,
    message: "refund",
    isChecked: false, //확인 유무(확인 안 함)
    created_at: "2025-01-03",
  },
];

type AlertType = "match" | "match_cancel" | "pay" | "refund";

type alertType = {
  id: number;
  message: AlertType;
  isChecked: boolean;
  created_at: string; // 몇분 전 이렇게 바꾸기
};

const messageMap = {
  match: {
    title: "담당 도우미 매칭완료",
    desc: "도우미와 매칭완료되었습니다.",
  },
  match_cancel: {
    title: "담당 도우미 매칭취소",
    desc: "도우미와 매칭취소되었습니다.",
  },
  pay: {
    title: "프로그램 결제완료",
    desc: "신청하신 프로그램 결제가 완료되었습니다.",
  },
  refund: {
    title: "프로그램 환불 완료",
    desc: "신청하신 프로그램 환불이 완료되었습니다.",
  },
};

//header component
const Header = () => {
  const router = useRouter();

  // zustand admin에 대한 정보 가져오기
  const { setAdminId } = useAuthStore();
  // 한번만 실행되도록
  const didFetch = useRef(false);

  // zustand 로그인 유저 정보 가져오기
  const { user } = useAuthStore();
  console.log(user); // {id, name, provider}

  // hover 드롭다운
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 스크롤
  const [isScrolled, setIsScrolled] = useState(false);

  // 알림 개수
  const [alertContent, setAlertContent] = useState<any>(0);
  const [alertNum, setAlertNum] = useState<any>(0);
  // 매칭에 대한 알림 개수
  const [matchAlertNum, setMatchAlertNum] = useState<Number>(0);

  // 장바구니 개수
  const [cartCount, setCartCount] = useState<number>(0);

  // 스크롤에 따른 헤더 변화
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // 장바구니 개수 요청
  const getCartCount = async () => {
    try {
      const res = await axiosInstance.get("/program/count");
      console.log("장바구니 개수", res.data.count);
      setCartCount(res.data.count);
    } catch (e) {
      console.error("장바구니 개수 가져오기 실패: ", e);
    }
  };

  // 담당 관리자 id 불러오기
  const getAdminId = async () => {
    try {
      const res = await axiosInstance.get("/user/admin");
      console.log("관리자id는 뭘까", res.data);
      setAdminId(res.data);
    } catch (e: any) {
      if (e.response?.status === 401) {
        setAdminId(null);
        console.info("담당 관리자 없음");
      } else {
        console.error("담당 관리자 불러오기 실패: ", e);
      }
    }
  };

  // 해당 user의 알림 내용 가져오기
  const getAlert = async () => {
    try {
      // const res = await axiosInstance.get("alert/alarm");
      // console.log("알림들:", res.data);
      setAlertContent(dummyDate);
      // setAlertContent(res.data); // 알림 내용
      setAlertNum(dummyDate.length);
      setMatchAlertNum(
        dummyDate.filter((item: any) => item.message?.includes("match")).length
      );
      // setAlertNum(res.data.filter((item: alertType) => !item.isChecked).length); // 알림 개수
    } catch (e) {
      console.error("알림 개수 가져오기 실패: ", e);
    }
  };

  // 해당 알림 읽기
  const readAlert = async () => {
    setAlertNum(0); // 알림 0개로

    await axiosInstance.patch("alert/checkAll"); // 해당 user의 모든 알림 읽기

    // 알림 notification
    alertContent.map((item: alertType, i: number) => {
      const { title, desc } = messageMap[item.message] || {};
      notification.info({
        key: i,
        message: title,
        description: desc,
      });
    });
  };

  useEffect(() => {
    getAlert();
    getCartCount(); // 장바구니 개수

    const interval = setInterval(() => {
      getAlert();
      getCartCount();
    }, 10000); // 10초마다 가져오기

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  // 알림이 match에 관한 내용이라면 담당 adminId 불러오기
  useEffect(() => {
    if (!didFetch.current) {
      getAdminId();
      didFetch.current = true;
    }
  }, [matchAlertNum]);

  // 메뉴 이미지 클릭
  const MoveMain = () => {
    router.push("/");
  };

  // 헤더 제외할 페이지
  const notPage = ["/join", "/login", "/chat", "/moreinfo"];

  const isHiddenStyle = notPage.includes(router.pathname);

  return (
    <HeaderStyled
      className={clsx("Header_main_wrap", { scrolled: isScrolled })}
    >
      <div className={isHiddenStyle ? "headerOff" : "header"}>
        <div className="Header_container">
          <div className="Header_logo_img" onClick={MoveMain}>
            <img className="Header_imgstyle" src={logo.src} alt="main-logo" />
          </div>

          {/* 로그인 유무에 따라 다른 JSX표시 */}
          {user?.name ? (
            // 로그인 O
            <div className="Header_user_container">
              <div
                className="user_wrap"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                onClick={() => setIsDropdownOpen((v) => !v)}
              >
                <span>{user.name} 님</span>
                <span className="Header_icon" />

                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                  <div className="Header_dropdown">
                    <div
                      className="Header_dropdown_item"
                      onClick={() => {
                        if (router.pathname !== "/mypage") {
                          // 다른페이지일 때만 모달 닫기
                          setIsDropdownOpen(false);
                          router.push("/mypage");
                        }
                      }}
                    >
                      개인정보 수정
                    </div>
                    <div
                      className="Header_dropdown_item"
                      onClick={() => {
                        // 상태 초기화 + 쿠키 삭제
                        useAuthStore.getState().logout();

                        window.location.replace("/");
                      }}
                    >
                      로그아웃
                    </div>
                  </div>
                )}
              </div>

              <div
                className="div_box"
                onClick={() => {
                  router.push("/payment");
                }}
              >
                <GrBook className="GrBook" />
                {cartCount > 0 && <span className="absolute">{cartCount}</span>}
              </div>

              <div className="div_box" onClick={readAlert}>
                <PiBellRinging className="bell" />
                <span className="absolute">{alertNum}</span>
                <span className="absolute">1</span>
              </div>
            </div>
          ) : (
            // 로그인 X
            <div className="Header_login_container">
              <span
                className="color"
                onClick={() => {
                  router.push("/join");
                }}
              >
                회원가입
              </span>
              <div className="line" />
              <span
                className="login"
                onClick={() => {
                  router.push("/login");
                }}
              >
                로그인
              </span>
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
