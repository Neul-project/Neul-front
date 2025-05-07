import { MyInfoStyled } from "./styled";
import Address from "../Address";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import { useState } from "react";

const MyInfo = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  // 회원탈퇴 요청
  const handleWithdraw = async () => {
    const confirmed = confirm("정말 회원을 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await axiosInstance.delete("/user/withdraw");

      if (res.data?.ok === true) {
        Cookies.remove("access_token");

        // 소셜 로그인 사용자일 경우 refresh_token도 제거
        if (Cookies.get("refresh_token")) {
          Cookies.remove("refresh_token");
        }

        alert("탈퇴가 완료되었습니다.");
        router.push("/");
      } else {
        alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err: any) {
      console.error("회원탈퇴 오류:", err);
    }
  };

  return (
    <MyInfoStyled>
      <div className="MyInfo_container">
        <div className="MyInfo_flex">
          <div className="MyInfo_cont">
            <div className="MyInfo_name">
              <span>홍길동</span>님
            </div>
            <div className="MyInfo_email">abcd@abcd.com</div>
          </div>

          <div className="MyInfo_changePw">
            <button type="button">비밀번호 변경</button>
          </div>
        </div>

        <div className="MyInfo_phone">
          <div className="title">휴대전화번호</div>
          <div className="phone">010-1111-1111</div>
        </div>

        <div className="MyInfo_flex MyInfo_address">
          <div>주소 관리</div>
          <div className="MyInfo_changePw">
            <button type="button" onClick={() => setIsOpen(true)}>
              주소 등록
            </button>
          </div>
        </div>
      </div>

      {isOpen && <Address onClose={() => setIsOpen(false)} />}

      <div>
        <button
          className="MyInfo_withDraw"
          type="button"
          onClick={handleWithdraw}
        >
          회원탈퇴
        </button>
      </div>
    </MyInfoStyled>
  );
};

export default MyInfo;
