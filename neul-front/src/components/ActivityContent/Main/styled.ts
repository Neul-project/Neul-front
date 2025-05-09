import styled from "styled-components";

export const ActivityContentStyled = styled.div`
  &.ActivityContent_main_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin: 20px auto;
    padding: 0px 20px;
    gap: 20px;

    .ActivityContent_title {
      display: flex;
      width: 100%;
      text-align: center;
      align-items: flex-end;
      gap: 10px;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
    .ActivityContent_subtitle {
      display: flex;
      gap: 10px;
      align-items: flex-end;
    }

    .ActivityContent_swiper {
      width: 100%;
      height: 400px;

      .ActivityContent_swperimg {
        width: 100%;
        height: 100%;
        object-fit: contain;
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

    .ActivityContent_text {
      margin-bottom: 10px;
    }
  }

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
