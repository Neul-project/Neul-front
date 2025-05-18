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
      z-index: 50;

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
  @media (max-width: 1330px) {
    &.SwiperImg_main_wrap {
      padding: 125px 10px 10px 30px;

      .SwiperImg_title {
        font-size: 25px;
        font-weight: bolder;
      }

      .SwiperImg_swiper {
        width: 100%;
        height: 340px;
        z-index: 50;

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
  }

  @media (max-width: 768px) {
    &.SwiperImg_main_wrap {
      padding: 125px 10px 10px 30px;
      .SwiperImg_title {
        font-size: 20px;
        font-weight: bolder;
      }

      .SwiperImg_swiper {
        width: 100%;
        height: 340px;
        z-index: 50;

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
  }
`;
