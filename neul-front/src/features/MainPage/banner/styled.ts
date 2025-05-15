import styled from "styled-components";

export const BannerStyled = styled.div`
  &.Banner_main_wrap {
    width: 100%;
    height: 100%;
    padding: 0px 40px;

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
        object-fit: cover;
      }
    }
  }

  @media (max-width: 768px) {
    &.Banner_main_wrap {
      width: 100%;
      height: 380px;
      padding: 0px 40px;

      .Banner_text {
        font-size: 20px;
        color: #fff;
        margin-top: 30px;
        margin-bottom: 35px;
        margin-left: 30px;
      }

      .Banner_slide {
        width: 100%;
        height: 230px;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;

        .Banner_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: border 0.2s ease, box-shadow 0.3s ease;

          &:hover {
            border-radius: 15px;
            border: 10px solid #5da487;
            box-shadow: 0 0 10px rgba(108, 166, 205, 0.4);
          }
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.Banner_main_wrap {
      width: 100%;
      height: 350px;
      padding: 0px 40px;

      .Banner_title_circle {
        position: relative;
        left: 70px;
        top: 26%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: auto;
        height: auto;
        background: none;
        z-index: -10;

        li {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 -10px;
          background: #5da487;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
      }

      .Banner_text {
        font-size: 15px;
        color: #fff;
        margin-top: 40px;
        margin-bottom: 30px;
        margin-left: 20px;
      }

      .Banner_slide {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;

        .Banner_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: border 0.2s ease, box-shadow 0.3s ease;

          &:hover {
            border-radius: 15px;
            border: 10px solid #5da487;
            box-shadow: 0 0 10px rgba(108, 166, 205, 0.4);
          }
        }
      }
    }
  }
`;
