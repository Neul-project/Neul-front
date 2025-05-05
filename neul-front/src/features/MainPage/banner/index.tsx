import clsx from "clsx";
import { BannerStyled } from "./styled";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

//image
import main01 from "@/assets/images/main01_deco.gif";
import main02 from "@/assets/images/main02_deco.gif";
import main03 from "@/assets/images/main03_deco.gif";

//banner
const Banner = () => {
  return (
    <BannerStyled className={clsx("Banner_main_wrap")}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="slide">
            <img className="Banner_imgstyle" src={main01.src} alt="banner-1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <img className="Banner_imgstyle" src={main02.src} alt="banner-2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <img className="Banner_imgstyle" src={main03.src} alt="banner-3" />
          </div>
        </SwiperSlide>
      </Swiper>
    </BannerStyled>
  );
};

export default Banner;
