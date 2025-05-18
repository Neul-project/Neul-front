import styled from "styled-components";

export const SwiperStyled = styled.div`
  &.SwiperImg_main_wrap {
    padding: 125px 10px 10px 60px;
    .SwiperImg_title {
      font-size: 30px;
      font-weight: bolder;
    }

    .SwiperImg_swiper {
      width: 100%;
      height: 400px;

      .SwiperImg_swperimg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .swiper-pagination-bullet {
      background: transparent;
      border: 1px solid #5da487;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: #5da487;
      opacity: 1;
    }
  }

  /* &.SwiperImg_rightside {
    padding: 0px 10px 10px 60px;
    .SwiperImg_title {
      font-size: 30px;
      font-weight: bolder;
    }

    .SwiperImg_swiper {
      width: 100%;
      height: 400px;

      .SwiperImg_swperimg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .swiper-pagination-bullet {
      background: transparent;
      border: 1px solid #5da487;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: #5da487;
      opacity: 1;
    }
  } */
`;
