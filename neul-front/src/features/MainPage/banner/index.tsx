import clsx from "clsx";
import { BannerStyled } from "./styled";

//image
import banner from "@/assets/images/banner.jpg";

//banner
const Banner = () => {
  return (
    <BannerStyled className={clsx("Banner_main_wrap")}>banner</BannerStyled>
  );
};

export default Banner;
