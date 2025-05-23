// components/SidebarMenu.tsx
import { SideBarMenuStyled } from "./styled";
import clsx from "clsx";

// import type { TabType } from "@/features/MyPage";

import { useAuthStore } from "@/stores/useAuthStore";

interface SidebarMenuProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

// 마이페이지 왼쪽 메뉴바 컴포넌트
const SidebarMenu = ({
  currentTab,
  onTabChange,
  onLogout,
}: SidebarMenuProps) => {
  // 로그인 시 역할 가져오기
  const role = useAuthStore((state) => state.user?.role);

  return (
    <SideBarMenuStyled>
      <div className="SideBar_wrap">
        {/* 공통 메뉴 */}
        <div
          className={clsx("SideBarMenu_item", {
            active: currentTab === "myinfo",
          })}
          onClick={() => onTabChange("myinfo")}
        >
          내 정보관리
        </div>

        {/* 사용자용 메뉴 */}
        {role === "user" && (
          <>
            <div
              className={clsx("SideBarMenu_item", {
                active: currentTab === "wardinfo",
              })}
              onClick={() => onTabChange("wardinfo")}
            >
              피보호자 정보관리
            </div>

            <div
              className={clsx("SideBarMenu_item", {
                active: currentTab === "program",
              })}
              onClick={() => onTabChange("program")}
            >
              프로그램 신청내역
            </div>

            <div
              className={clsx("SideBarMenu_item", {
                active: currentTab === "helper_application",
              })}
              onClick={() => onTabChange("helper_application")}
            >
              도우미 신청내역
            </div>
          </>
        )}

        {/* 관리자용 메뉴 */}
        {role === "admin" && (
          <div
            className={clsx("SideBarMenu_item", {
              active: currentTab === "approval_history",
            })}
            onClick={() => onTabChange("approval_history")}
          >
            가입승인 내역
          </div>
        )}
      </div>
      <div className="SideBarMenu_logout">
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </SideBarMenuStyled>
  );
};

export default SidebarMenu;
