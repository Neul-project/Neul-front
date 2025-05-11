import { IntroSectionStyled } from "./styled";

//component
import NavigationElement from "@/features/MainPage/NavigationElement";
import clsx from "clsx";

//image
import backimg from "@/assets/images/visual-bg.png";
import gif from "@/assets/images/main02_deco.gif";
import star from "@/assets/images/start.png";
import bluestar from "@/assets/images/bluestar.png";

//메인 페이지 > 상위 탭 구성 (프로그램 신청 배너, 네비게이션)
const IntroSection = () => {
  return (
    <IntroSectionStyled
      className={clsx("IntroSection_main_wrap")}
      $bannerimg={gif.src}
    >
      <div className="IntroSection_Navigation">
        <NavigationElement />
      </div>
      <div className="IntroSection_banner">
        <div className="IntroSection_star">
          <img className="IntroSection_imgstyle" src={star.src} alt="star" />
        </div>
        <div className="IntroSection_bluestar">
          <img
            className="IntroSection_imgstyle"
            src={bluestar.src}
            alt="star"
          />
        </div>
      </div>
    </IntroSectionStyled>
  );
};

export default IntroSection;
