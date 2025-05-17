import styled from "styled-components";

export const SubContentStyled = styled.div`
  &.SubContent_main_wrap {
    padding: 125px 10px 10px 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;

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
      justify-content: left;
      margin-top: 10px;

      .SubContent_feedback_btn {
        font-family: "Gowun Batang", serif;
        font-weight: 400;
        font-style: normal;

        border: none;
        box-shadow: none;
        font-size: 22px;
        width: 150px;
      }
    }

    .SubContent_row {
      display: flex;

      .SubContent_text {
        min-width: 140px;
        font-weight: bold;
        font-size: 22px;
        color: #999;
      }

      .SubContent_re_text {
        min-width: 120px;
        font-weight: bold;
        font-size: 22px;
      }

      .SubContent_re_text_note {
        width: 100%;
        height: 350px;
        overflow-y: auto;
      }
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
