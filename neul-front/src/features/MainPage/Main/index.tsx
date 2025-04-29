import clsx from "clsx";
import { MainPageStyled } from "./styled";

//component
import Header from "@/components/Header";
import IntroSection from "../IntroSection";

//main page component
const MainPage = () => {
  return (
    <>
      <Header />
      <MainPageStyled className={clsx("MainPage_main_wrap")}>
        <IntroSection /> {/* banner + navigator */}
      </MainPageStyled>
    </>
  );
};

export default MainPage;
