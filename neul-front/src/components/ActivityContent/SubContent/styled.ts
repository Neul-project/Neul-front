import styled from "styled-components";

export const SubContentStyled = styled.div`
  &.SubContent_main_wrap {
    padding: 125px 10px 10px 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    .SubContent_clip_box {
      display: none;
      width: 130px;
      position: absolute;
      top: -25px;
      left: -10px;
      .SubContent_clip {
        width: 100%;
        height: 100%;
      }
    }

    .SubContent_left {
      display: none;
    }
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
        cursor: pointer;
        border: none;
        box-shadow: none;
        font-size: 22px;
        width: 150px;
      }
    }

    .SubContent_content {
      display: flex;
      flex-direction: column;
      gap: 40px;
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

  @media (max-width: 1330px) {
    &.SubContent_main_wrap {
      padding: 0px 10px 10px 30px;
      display: flex;
      flex-direction: column;
      gap: 60px;

      .SubContent_clip_box {
        display: block;
        width: 130px;
        position: absolute;
        top: -25px;
        left: -10px;
        .SubContent_clip {
          width: 100%;
          height: 100%;
        }
      }
      .SubContent_left {
        display: block;
      }
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
          text-align: left;
          cursor: pointer;
        }
      }

      .SubContent_content {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-left: 30px;
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
  }

  @media (max-width: 768px) {
    &.SubContent_main_wrap {
      padding: 0px 10px 10px 30px;
      display: flex;
      flex-direction: column;
      gap: 40px;

      .SubContent_clip_box {
        display: block;
        width: 130px;
        position: absolute;
        top: -25px;
        left: -10px;
        .SubContent_clip {
          width: 100%;
          height: 100%;
        }
      }
      .SubContent_left {
        display: block;
      }
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
          text-align: left;
          font-size: 20px;
          width: 150px;
        }
      }

      .SubContent_content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-left: 30px;
      }

      .SubContent_row {
        display: flex;

        .SubContent_text {
          min-width: 140px;
          font-weight: bold;
          font-size: 20px;
          color: #999;
        }

        .SubContent_re_text {
          min-width: 120px;
          font-weight: bold;
          font-size: 20px;
        }

        .SubContent_re_text_note {
          width: 100%;
          height: 350px;
          overflow-y: auto;
        }
      }
    }
  }
  @media (max-width: 486px) {
    &.SubContent_main_wrap {
      padding: 0px 10px 10px 0px;
      display: flex;
      flex-direction: column;
      gap: 40px;

      .SubContent_clip_box {
        display: block;
        width: 130px;
        position: absolute;
        top: -25px;
        left: -10px;
        .SubContent_clip {
          width: 100%;
          height: 100%;
        }
      }
      .SubContent_left {
        display: block;
      }
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
          text-align: left;
          font-size: 20px;
          width: 150px;
        }
      }

      .SubContent_content {
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding-left: 30px;
      }
      .SubContent_row_note {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .SubContent_row {
        display: flex;

        .SubContent_text {
          min-width: 140px;
          font-weight: bold;
          font-size: 20px;
          color: #999;
        }

        .SubContent_re_text {
          min-width: 120px;
          font-weight: bold;
          font-size: 20px;
        }

        .SubContent_re_text_note {
          width: 100%;
          height: 350px;
          overflow-y: auto;

          /* word-break: break-word; // 긴 단어 잘라주기
          overflow-wrap: break-word; // 줄 바꿈 가능한 위치에서 줄바꿈
          white-space: pre-wrap; // 줄바꿈 + 공백 유지
          overflow-x: hidden; // 수평 스크롤 제거 */
        }
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
