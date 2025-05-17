import { SwiperStyled } from "./styled";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import clsx from "clsx";

//활동기록 스와이퍼 이미지
const SwiperImg = (props: { img: any; title: string; patientname: string }) => {
  const { img, title, patientname } = props;
  return (
    <SwiperStyled className={clsx("SwiperImg_main_wrap")}>
      <div className="SwiperImg_title">{patientname}님 활동기록</div>
      <Swiper
        modules={[Pagination, Autoplay]}
        className="SwiperImg_swiper"
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
      >
        {img.map((element: any, index: number) => (
          <SwiperSlide key={index}>
            <img
              src={
                process.env.NEXT_PUBLIC_API_URL + "/uploads/image/" + element
              }
              alt={`preview-0`}
              className="SwiperImg_swperimg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperStyled>
  );
};

export default SwiperImg;
