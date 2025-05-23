import { MyPageStyled } from "./styled";

import SidebarMenu from "@/components/SideBarMenu";
import MyInfo from "@/components/MyInfo";
import WardInfo from "@/components/WardInfo";
import ProgramHistory from "@/components/ProgramHistory";
import HelperApplication from "@/components/HelperApplication";
import ApprovalHistory from "@/components/ApprovalHistory";

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// export type TabType =
//   | "myinfo"
//   | "wardinfo"
//   | "program"
//   | "helper_application"
//   | "approval_history";

// 마이페이지 메인 컴포넌트
// 왼쪽 사이드바에서 메뉴 선택 시 쿼리스트링을 통해 URL 상태 반영
const MyPageCompo = () => {
  const router = useRouter();

  const [type, setType] = useState("myinfo");

  // const searchParams = useSearchParams();
  // 현재 URL의 tab 값을 읽어 활성화된 메뉴 판단
  // const currentTab = (searchParams.get("tab") as TabType) || "myinfo";

  // 탭을 클릭할 때 URL 쿼리스트링 변경
  // const setTab = (tab: TabType) => {
  //   router.push(`?tab=${tab}`);

  // };

  // 메뉴에 따른 콘텐츠 컴포넌트 조건 렌더링
  // const renderContent = () => {
  //   switch (currentTab) {
  //     case "myinfo":
  //       return <MyInfo />;
  //     case "wardinfo":
  //       return <WardInfo />;
  //     case "program":
  //       return <ProgramHistory />;
  //     case "helper_application":
  //       return <HelperApplication />;
  //     case "approval_history":
  //       return <ApprovalHistory />;
  //     default:
  //       return <div>탭을 찾을 수 없습니다.</div>;
  //   }
  // };

  return (
    <MyPageStyled>
      <div className="MyPage_container">
        {/* 왼쪽 메뉴바 */}
        <div className="MyPage_leftContainer">
          <SidebarMenu
            currentTab={type}
            onTabChange={setType}
            onLogout={() => {
              // 상태 초기화 + 쿠키 삭제
              useAuthStore.getState().logout();
              window.location.replace("/");
            }}
          />
        </div>

        {/* 오른쪽 컨텐츠 내용 */}
        <div className="MyPage_rightContainer">
          {/* {renderContent()} */}
          {type === "myinfo" && <MyInfo />}
          {type === "wardinfo" && <WardInfo />}
          {type === "program" && <ProgramHistory />}
          {type === "helper_application" && <HelperApplication />}
          {type === "approval_history" && <ApprovalHistory />}
        </div>
      </div>
    </MyPageStyled>
  );
};

export default MyPageCompo;
