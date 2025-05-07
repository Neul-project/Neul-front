import { useRouter, useSearchParams } from "next/navigation";
import { MyPageStyled } from "./styled";

import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

import SidebarMenu from "@/components/SideBarMenu";
import MyInfo from "@/components/MyInfo";
import WardInfo from "@/components/WardInfo";
import ProgramHistory from "@/components/ProgramHistory";

type TabType = "myinfo" | "wardinfo" | "program";

// 마이페이지 메인 컴포넌트
// 왼쪽 사이드바에서 메뉴 선택 시 쿼리스트링을 통해 URL 상태 반영
const MyPageCompo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 현재 URL의 tab 값을 읽어 활성화된 메뉴 판단
  const currentTab = (searchParams.get("tab") as TabType) || "myinfo";

  // 탭을 클릭할 때 URL 쿼리스트링 변경
  const setTab = (tab: TabType) => {
    router.push(`?tab=${tab}`);
  };

  // 메뉴에 따른 콘텐츠 컴포넌트 조건 렌더링
  const renderContent = () => {
    switch (currentTab) {
      case "myinfo":
        return <MyInfo />;
      case "wardinfo":
        return <WardInfo />;
      case "program":
        return <ProgramHistory />;
      default:
        return <div>탭을 찾을 수 없습니다.</div>;
    }
  };

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
    <MyPageStyled>
      <div className="MyPage_container">
        {/* 왼쪽 메뉴바 */}
        <div className="MyPage_leftContainer">
          <SidebarMenu
            currentTab={currentTab}
            onTabChange={setTab}
            onLogout={() => {
              // 로그아웃 처리 로직
              Cookies.remove("access_token");
              Cookies.remove("refresh_token");
              router.push("/");
            }}
          />
        </div>

        {/* 오른쪽 컨텐츠 내용 */}
        <div className="MyPage_rightContainer">{renderContent()}</div>

        <div>
          <button onClick={handleWithdraw}>회원탈퇴</button>
        </div>
      </div>
    </MyPageStyled>
  );
};

export default MyPageCompo;
