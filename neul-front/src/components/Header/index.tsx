import clsx from "clsx";
import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//images
import logo from "@/assets/images/new_logo.png";

import { GrBook } from "react-icons/gr";
import { PiBellRinging } from "react-icons/pi";

import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import axiosInstance from "@/lib/axios";
import { notification } from "antd";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type AlertType =
  | "match_apply" // 도우미에게 매칭 신청
  | "match_ok" // 도우미 매칭 수락하면 승인완료(결제 요청하기->마이페이지)
  | "pay_match" // 사용자가 결제함
  | "match_cancel" // 도우미가 매칭을 거절(거절 사유도 함께 보내주기)
  | "pay_program" // 프로그램 결제 완료
  | "refund_program" //프로그램 환불 완료
  | "helper_ok" //총관리자가 도우미 승인(도우미 페이지 링크 보내기)
  | "helper_cancel" //총관리자가 승인 반려(사유도 보내기+마이페이지에서 정보 수정해서 다시 제출하세요 알림)
  | "match_end"; // 매칭 완료

type alertType = {
  id: number;
  message: AlertType;
  isChecked: boolean;
  reason: string;
  created_at: string; // 몇분 전 이렇게 바꾸기
};

const messageMap: Record<AlertType, { title: string; desc: string }> = {
  match_apply: {
    title: "매칭 신청 완료",
    desc: "매칭 신청이 완료 되었습니다. 승인될 때까지 기다려주세요.",
  },
  match_ok: {
    title: "매칭 수락 완료",
    desc: "도우미가 매칭을 수락했습니다. 마이페이지에서 결제를 진행해주세요.",
  },
  pay_match: {
    title: "매칭 결제 완료",
    desc: "최종 매칭 되었습니다. 문의사항은 채팅을 활용해주세요.",
  },
  match_cancel: {
    title: "매칭 거절",
    desc: "도우미가 매칭을 거절했습니다.",
  },
  pay_program: {
    title: "프로그램 결제 완료",
    desc: "프로그램 결제가 완료되었습니다.",
  },
  refund_program: {
    title: "프로그램 환불 완료",
    desc: "프로그램 환불이 완료되었습니다.",
  },
  helper_ok: {
    title: "도우미 승인 완료",
    desc: "도우미 승인이 완료되었습니다. 관련 정보를 확인해주세요.",
  },
  helper_cancel: {
    title: "도우미 승인 반려",
    desc: "도우미 승인이 반려되었습니다. 마이페이지에서 정보 수정 후 다시 제출해주세요.",
  },
  match_end: {
    title: "매칭 종료",
    desc: "매칭이 종료되었습니다.",
  },
};

//header component
const Header = () => {
  const router = useRouter();

  // zustand 로그인 유저 정보, admin 정보 가져오기
  const { setAdminId, user } = useAuthStore();
  const userId = user?.id;
  // console.log(user); // {id, name, provider}

  // hover 드롭다운
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 스크롤
  const [isScrolled, setIsScrolled] = useState(false);

  // 알림 개수
  const [alertContent, setAlertContent] = useState<any>();
  const [alertNum, setAlertNum] = useState<any>(0);
  // 매칭에 대한 알림 개수
  const [matchAlertNum, setMatchAlertNum] = useState<Number>(0);

  // 장바구니 개수
  const cartCount = useCartStore((state) => state.cartCount);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const fetchCartCount = useCartStore((state) => state.fetchCartCount);

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartCount();
    }
  }, [isLoggedIn]);

  // 스크롤에 따른 헤더 변화
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // 해당 user의 알림 내용 가져오기
  const getAlert = async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get("alert/alarm");
      setAlertContent(res.data.filter((item: any) => !item.isChecked)); // 알림 내용
      setMatchAlertNum(
        res.data.filter((item: any) => item.message?.includes("match")).length // 매칭 관련 알림 개수
      );
      setAlertNum(res.data.filter((item: alertType) => !item.isChecked).length); // 알림 개수
    } catch (e) {
      console.error("알림 내용 가져오기 실패: ", e);
    }
  };

  // 담당 관리자 id 불러오기
  const getAdminId = async () => {
    try {
      const res = await axiosInstance.get("/user/admin", {
        params: { userId },
      });

      // 204 No Content 응답일 경우도 고려
      if (res.status === 204 || !res.data) {
        setAdminId(null);
        console.warn("관리자 정보 없음 (204 No Content)");
        return;
      }

      setAdminId(res.data);
    } catch (e: any) {
      const status = e.response?.status;

      if (status === 401 || status === 403) {
        // 인증되지 않았거나 권한이 없음 → 일반 사용자일 수 있음
        setAdminId(null);
        console.warn("관리자 정보 없음 (401 또는 403)");
      } else {
        // 그 외 에러는 로그로 확인
        console.error("관리자 정보 요청 중 오류:", e);
      }
    }
  };

  // 해당 알림 읽기
  const readAlert = async () => {
    setAlertNum(0); // 알림 0개
    setAlertContent(null);

    await axiosInstance.patch("alert/checkAll"); // 해당 user의 모든 알림 읽기

    // 알림 notification
    alertContent?.map((item: alertType, i: number) => {
      const { title, desc } = messageMap[item.message] || {};
      dayjs.locale("ko");
      const timeAgo = dayjs(item.created_at).fromNow(); // 몇분전

      let description = `${desc} (${timeAgo})`;

      // reason이 있으면 추가
      if (item.reason) {
        description += `\n거절 사유: ${item.reason}`;
      }

      // helper_ok인 경우 링크 추가
      if (item.message === "helper_ok") {
        description += `\n[도우미 페이지로 이동]`;
      }

      notification.info({
        key: i,
        message: title,
        description: (
          <div>
            {description.split("\n").map((line, index) => {
              if (line === "[도우미 페이지로 이동]") {
                return (
                  <div key={index}>
                    <a
                      href="http://localhost:4000/"
                      style={{ color: "#1677ff" }}
                    >
                      도우미 페이지로 이동
                    </a>
                  </div>
                );
              }
              return <div key={index}>{line}</div>;
            })}
          </div>
        ),
        duration: 10,
      });
    });
  };

  useEffect(() => {
    getAlert();

    const interval = setInterval(() => {
      getAlert();
    }, 10000); // 10초마다 가져오기

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [user]);

  // 알림이 match에 관한 내용이라면 담당 adminId 불러오기
  useEffect(() => {
    if (!userId) return;
    getAdminId();
  }, [matchAlertNum, userId]);

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
                <span>
                  <strong className="username">{user.name} </strong>님
                </span>
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
                      마이페이지
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
                {alertNum > 0 && <span className="absolute">{alertNum}</span>}
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
