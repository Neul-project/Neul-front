import clsx from "clsx";
import { HeaderStyled } from "./styled";
import { useRouter } from "next/router";

//images
import logo from "@/assets/images/logo.png";

//header component
const Header = () => {
  const router = useRouter();

  //메뉴 이미지 클릭
  const MoveMain = () => {
    router.push("/");
  };

  // 헤더 제외할 페이지
  const notPage = ["/join", "/login", "/chat"];

  const isHiddenStyle = notPage.includes(router.pathname);

  return (
    <HeaderStyled className={clsx(`Header_main_wrap`)}>
      <div className={isHiddenStyle ? "headerOff" : "header"}>
        <div className="Header_logo_img" onClick={MoveMain}>
          <img className="Header_imgstyle" src={logo.src} alt="main-logo" />
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
