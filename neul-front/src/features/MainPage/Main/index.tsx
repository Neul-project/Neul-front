import clsx from "clsx";
import { MainPageStyled } from "./styled";

//component
import IntroSection from "../IntroSection";
import Advertising from "@/features/Advertising";

//main page component
const MainPage = () => {
  return (
    <MainPageStyled className={clsx("MainPage_main_wrap")}>
      <IntroSection /> {/* banner + navigator */}
      <Advertising /> {/* 광고 */}
    </MainPageStyled>
  );
};

export default MainPage;
