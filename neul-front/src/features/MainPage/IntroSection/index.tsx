import { IntroSectionStyled } from "./styled";

//component
import Banner from "../banner";
import NavigationElement from "@/components/NavigationElement";

//메인 페이지 > 상위 탭 구성 (프로그램 신청 배너, 네비게이션)
const IntroSection = () => {
  return (
    <IntroSectionStyled className="IntroSection_main_wrap">
      <Banner />
      <NavigationElement />
    </IntroSectionStyled>
  );
};

export default IntroSection;
