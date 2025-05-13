import clsx from "clsx";
import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//images
import logo from "@/assets/images/logo_small.png";

import { GrBook } from "react-icons/gr";
import { PiBellLight } from "react-icons/pi";

import { useAuthStore } from "@/stores/useAuthStore";

//header component
const Header = () => {
  const router = useRouter();

  // zustand 로그인 유저 정보 가져오기
  const { user } = useAuthStore();
  console.log(user); // {id, name, provider}

  // hover 드롭다운
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 스크롤
  const [isScrolled, setIsScrolled] = useState(false);

  // 스크롤에 따른 헤더 변화
  const handleScroll = () => {
    if (window.scrollY > 64) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <div
              className="Header_user_container"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              onClick={() => setIsDropdownOpen((v) => !v)}
            >
              <span>{user.name} 님</span>
              <span className="Header_icon" />

              <GrBook />
              <PiBellLight />

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
