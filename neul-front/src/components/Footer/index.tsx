import clsx from "clsx";
import { FooterStyled } from "./styled";
import { useRouter } from "next/router";

//header component
const Footer = () => {
  const router = useRouter();

  // 헤더 제외할 페이지
  const notPage = ["/join", "/login", "/chat"];

  const isHiddenStyle = notPage.includes(router.pathname);

  return (
    <FooterStyled className={clsx(`Footer_main_wrap`)}>
      <div className={isHiddenStyle ? "footerOff" : "footer"}>
        <div className="Footer_text">
          Neul | 사업자등록번호 112-252-123 | 권태연 김예지 이정민 최승연
        </div>
        <div className="Footer_text">
          <a href="https://github.com/orgs/Neul-project/repositories">Github</a>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
