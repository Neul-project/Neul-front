import clsx from "clsx";
import { HeaderStyled } from "./styled";

/*
1. main logo -> 클릭 시 메인 이동
2. 로그인 / 회원가입 표시
*/

//images
import logo from "@/assets/images/logo.png";
import menu from "@/assets/images/menu.png";

//header component
const Header = () => {
  //메뉴 이미지 클릭
  const Menu = () => {};

  return (
    <HeaderStyled className={clsx("Header_main_wrap")}>
      <div className="Header_logo_img">
        <img className="Header_imgstyle" src={logo.src} alt="main-logo" />
      </div>
      <div className="Header_menu" onClick={Menu}>
        <img className="Header_imgstyle" src={menu.src} alt="menu-img" />
      </div>
    </HeaderStyled>
  );
};

export default Header;
