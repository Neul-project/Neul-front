import clsx from "clsx";
import { BannerStyled } from "./styled";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

//image
import main01 from "@/assets/images/back1.jpg";
import main02 from "@/assets/images/back2.jpg";
import main03 from "@/assets/images/back3.jpg";
import main04 from "@/assets/images/back1.jpg";
import main05 from "@/assets/images/back2.jpg";
import main06 from "@/assets/images/back3.jpg";

//banner
const Banner = () => {
  // **백엔드에서 리스트 받기
  const list = [main01, main02, main03, main04, main05, main06];

  return (
    <BannerStyled className={clsx("Banner_main_wrap")}>
      <div>새로운 프로그램</div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        //pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            spaceBetween: 0,
            slidesPerView: 1,
          },
          486: {
            spaceBetween: 20,
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 30,
            slidesPerView: 3,
          },
        }}
      >
        {list.map((element: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="Banner_slide">
              <img
                className="Banner_imgstyle"
                src={element.src}
                alt={`banner-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </BannerStyled>
  );
};

export default Banner;
