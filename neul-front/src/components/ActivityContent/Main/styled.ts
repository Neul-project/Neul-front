import styled from "styled-components";

export const ActivityContentStyled = styled.div`
  &.ActivityContent_main_wrap {
    font-family: "Gowun Batang", serif;
    font-weight: 400;
    font-style: normal;

    /* max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin: 40px auto;
    padding: 0px 20px; */
    //gap: 20px;

    max-width: 1280px;
    width: 100%;
    //min-height: 809.15px;
    margin: 0 auto;
    height: 100%;
    min-height: calc(100vh - 155px);

    .ActivityContent_sub {
      width: 100%;
      display: flex;
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 809.15px;
      margin: 40px auto;
    }
  }

  /* @media (max-width: 1330px) {
    &.ActivityContent_main_wrap {
      font-family: "Gowun Batang", serif;
      font-weight: 400;
      font-style: normal;

      max-width: 1280px;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;

      //align-items: center;
      margin: 40px auto;
      padding: 0px 0px;
      //gap: 20px;

      .ActivityContent_sub {
        display: block;
        width: 100%;
        margin: 0px auto;

        .ActivityContent_swiper {
          width: 50%;
          height: 100%;
        }
        .ActivityContent_content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
        }
      }
    }
  } */

  @media (max-width: 768px) {
    .ActivityContent_title {
      font-size: 20px;
    }
    .ActivityContent_swiper {
      height: 300px;
    }
    .ActivityContent_subtitle {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .ActivityContent_title {
      font-size: 18px;
    }
    .ActivityContent_swiper {
      height: 200px;
    }

    .ActivityContent_type {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 30px;
    }

    .ActivityContent_feedback_btn {
      width: 100%;
    }
  }
`;

export const theme = {
  components: {
    Select: {
      /* here is your component tokens */
      colorBgContainerDisabled: "#ffffff",
    },
    Radio: {
      colorBgContainerDisabled: "#ffffff",
    },
    Input: {
      colorBgContainerDisabled: "#ffffff", // TextArea 비활성화 배경색
    },
  },
};
