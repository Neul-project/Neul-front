import styled from "styled-components";

export const BannerStyled = styled.div`
  &.Banner_main_wrap {
    width: 100%;
    height: 100%;
    //padding: 0px 40px;

    .Banner_text {
      font-size: 24px;
      color: #333;
      font-weight: bold;
      margin-bottom: 15px;
      letter-spacing: -1.5px;
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
      width: 605px;
      height: 650px;
      //border: 1px solid black;
      border-radius: 15px;
      overflow: hidden;
      cursor: pointer;
      background-color: #fef6d4;

      .Banner_imgstyle {
        width: 100%;
        height: 100%;
        //background-color: #ccc;
        /* object-fit: cover; */
      }
    }

    .Banner_empty {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60px;
      text-align: center;
      .empty_img {
        .Banner_imgstyle {
          width: 55px;
          height: 55px;
        }
      }
    }
    .Banner_ing {
    }
  }

  /* .aaa {
    height: 500px;
  }

  .swiper-slide {
    height: 600px;
  } */

  @media (max-width: 768px) {
    &.Banner_main_wrap {
      width: 100%;
      height: 100%;
      //padding: 0px 40px;

      .Banner_text {
        font-size: 23px;
        color: #333;
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
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .swiper-pagination {
        position: absolute;
        top: 10px;
        left: 70%;
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
