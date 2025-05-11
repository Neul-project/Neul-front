import styled from "styled-components";

export const BannerStyled = styled.div`
  &.Banner_main_wrap {
    width: 100%;
    height: 400px;
    //border: 1px solid black;
    //border-radius: 15px;
    //overflow: hidden;
    padding: 0px 40px;
    //background-color: #5da487;

    .Banner_title_circle {
      position: relative;
      left: 115px;
      top: 25%;
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
        width: 55px;
        height: 55px;
        margin: 0 -10px;
        background: #5da487;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
    }

    .Banner_text {
      font-size: 20px;
      color: #fff;
      margin-top: 30px;
      margin-bottom: 43px;
      margin-left: 45px;
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
`;
