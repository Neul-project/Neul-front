import styled from "styled-components";

export const SwiperStyled = styled.div`
  &.SwiperImg_main_wrap {
    padding: 125px 10px 10px 60px;
    .SwiperImg_title {
      font-size: 30px;
      font-weight: bolder;
      //padding-left: 20px;
      margin-bottom: 30px;
    }

    .SwiperImg_swiper {
      width: 90%;
      height: 500px;
      z-index: 50;
      padding-right: 50px;

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
    .SwiperImg_swiper {
      position: relative;
      padding-bottom: 40px; /* 페이지네이션 영역 확보 */
    }
    .swiper-pagination {
      position: absolute !important;
      bottom: 0px;
      width: 100%;
      text-align: center;
      z-index: 10;
      padding-right: 50px;
    }
  }
  @media (max-width: 1330px) {
    &.SwiperImg_main_wrap {
      padding: 125px 40px 10px 40px;
      .SwiperImg_title {
        font-size: 25px;
        font-weight: bolder;
        padding-left: 0px;
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
      padding: 125px 30px 10px 30px;

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

  @media (max-width: 486px) {
    &.SwiperImg_main_wrap {
      padding: 125px 10px 10px 10px;

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
