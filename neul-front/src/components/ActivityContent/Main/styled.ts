import styled from "styled-components";

export const ActivityContentStyled = styled.div`
  &.ActivityContent_main_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin: 0px auto;
    //padding: 0px 20px;
    gap: 20px;

    .ActivityContent_title {
      font-size: 24px;
    }
    .ActivityContent_subtitle {
      display: flex;
      gap: 10px;
    }

    .ActivityContent_swiper {
      width: 80%;
      height: 500px;

      .ActivityContent_swperimg {
        width: 100%;
        height: 100%;
      }
    }

    .ActivityContent_type {
      display: flex;
      width: 100%;
      gap: 30px;
    }

    .ActivityContent_feedback {
      display: flex;
      justify-content: center;
      .ActivityContent_feedback_btn {
        width: 150px;
      }
    }
  }
`;
