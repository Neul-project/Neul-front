import styled from "styled-components";

export const SubContentStyled = styled.div`
  &.SubContent_main_wrap {
    .SubContent_type {
      display: flex;
      width: 100%;
      gap: 30px;
    }

    .SubContent_option {
      margin-top: 10px;
    }

    .SubContent_feedback {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      .ActivityContent_feedback_btn {
        width: 150px;
      }
    }

    .SubContent_text {
      margin-bottom: 10px;
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
