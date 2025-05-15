import clsx from "clsx";
import { BannerStyled } from "./styled";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

//image
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//banner
const Banner = () => {
  const [bannerItems, setBannerItems] = useState<{ id: number; img: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    axiosInstance.get("/program/list").then((res) => {
      const data = res.data.slice(0, 5);

      const items = data.map((element: any) => ({
        id: element.id,
        img: element.img.split(",")[0], // 첫 번째 이미지
      }));

      setBannerItems(items);
    });
  }, []);

  //console.log("imglist", bannerItems);

  const handleClick = (id: number) => {
    //console.log("클릭한 배너 ID:", id);
    router.push(`/program/${id}`);
  };

  return (
    <BannerStyled className={clsx("Banner_main_wrap")}>
      <div className="Banner_text">새로운 프로그램</div>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {bannerItems.map((element: any, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="Banner_slide"
              onClick={() => handleClick(element.id)}
            >
              <img
                className="Banner_imgstyle"
                src={
                  process.env.NEXT_PUBLIC_API_URL + "/uploads/" + element.img
                }
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
