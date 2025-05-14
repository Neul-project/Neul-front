import { IntroSectionStyled } from "./styled";

//component
import NavigationElement from "@/features/MainPage/NavigationElement";
import clsx from "clsx";

//image
import Banner from "../banner";

//메인 페이지 > 상위 탭 구성 (프로그램 신청 배너, 네비게이션)
const IntroSection = () => {
  return (
    <IntroSectionStyled className={clsx("IntroSection_main_wrap")}>
      <div className="IntroSection_banner">
        <Banner />
      </div>

      <div className="IntroSection_Navigation">
        <NavigationElement />
      </div>
    </IntroSectionStyled>
  );
};

export default IntroSection;
