// components/SidebarMenu.tsx
import { SideBarMenuStyled } from "./styled";
import clsx from "clsx";

type TabType = "myinfo" | "wardinfo" | "program";

interface SidebarMenuProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout?: () => void;
}

// 마이페이지 왼쪽 메뉴바 컴포넌트
const SidebarMenu = ({
  currentTab,
  onTabChange,
  onLogout,
}: SidebarMenuProps) => {
  return (
    <SideBarMenuStyled>
      <div className="SideBar_wrap">
        <div
          className={clsx("SideBarMenu_item", {
            active: currentTab === "myinfo",
          })}
          onClick={() => onTabChange("myinfo")}
        >
          내 정보관리
        </div>
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
      </div>
      <div className="SideBarMenu_logout">
        <button onClick={onLogout}>로그아웃</button>
      </div>
    </SideBarMenuStyled>
  );
};

export default SidebarMenu;
