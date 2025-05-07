import { MyInfoStyled } from "./styled";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const MyInfo = () => {
  const router = useRouter();

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
      <div>내정보 관리임</div>

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
