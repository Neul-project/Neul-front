import styled from "styled-components";

export const BannerStyled = styled.div`
  &.Banner_main_wrap {
    width: 100%;
    height: 100%;
    //padding: 0px 40px;

    .Banner_text {
      font-size: 25px;
      color: #000;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .swiper-pagination {
      position: absolute;
      top: 10px;
      left: 80%;
      width: auto;
      height: 100px;
      gap: 6px;
    }

    .swiper-pagination-bullet {
      background: transparent;
      border: 1px solid white;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: #fff;
      opacity: 1;
    }

    .Banner_slide {
      width: 100%;
      height: 400px;
      //border: 1px solid black;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;

      .Banner_imgstyle {
        width: 100%;
        height: 100%;
        //background-color: #ccc;
        object-fit: cover;
      }
    }
  }

  @media (max-width: 768px) {
    &.Banner_main_wrap {
      width: 100%;
      height: 100%;
      //padding: 0px 40px;

      .Banner_text {
        font-size: 20px;
        color: #000;
        font-weight: bold;
        margin-bottom: 15px;
      }

      .swiper-pagination {
        position: absolute;
        top: 10px;
        left: 80%;
        width: auto;
        height: 100px;
        gap: 6px;
      }

      .swiper-pagination-bullet {
        background: transparent;
        border: 1px solid white;
        opacity: 1;
      }

      .swiper-pagination-bullet-active {
        background: #fff;
        opacity: 1;
      }

      .Banner_slide {
        width: 100%;
        height: 350px;
        //border: 1px solid black;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;

        .Banner_imgstyle {
          width: 100%;
          height: 100%;
          //background-color: #ccc;
          object-fit: cover;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.Banner_main_wrap {
      width: 100%;
      height: 100%;
      //padding: 0px 40px;

      .Banner_text {
        font-size: 19px;
        color: #000;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .swiper-pagination {
        position: absolute;
        top: 10px;
        left: 80%;
        width: auto;
        height: 100px;
        gap: 6px;
      }

      .swiper-pagination-bullet {
        background: transparent;
        border: 1px solid white;
        opacity: 1;
      }

      .swiper-pagination-bullet-active {
        background: #fff;
        opacity: 1;
      }

      .Banner_slide {
        width: 100%;
        height: 230px;
        //border: 1px solid black;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;

        .Banner_imgstyle {
          width: 100%;
          height: 100%;
          //background-color: #ccc;
          object-fit: cover;
        }
      }
    }
  }
`;
