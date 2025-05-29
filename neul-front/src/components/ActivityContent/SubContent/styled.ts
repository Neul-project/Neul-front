import styled from "styled-components";

export const SubContentStyled = styled.div`
  &.SubContent_main_wrap {
    /*display: flex;
    flex-direction: column;
    gap: 45px; */
    width: 100%;
    position: absolute;
    z-index: 25;
    padding: 0 32px;
    padding: 135px 60px 10px 60px;
    position: relative;

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
      justify-content: right;
      margin-top: 10px;

      .SubContent_feedback_btn {
        font-family: "Gowun Batang", serif;
        font-weight: 400;
        font-style: normal;
        cursor: pointer;
        //border: none;
        box-shadow: none;
        font-size: 22px;
        //width: 150px;
        height: 45px;
      }
    }

    .SubContent_content {
      display: flex;
      flex-direction: column;
      //gap: 10px;
      margin-bottom: 16px;
    }
    .SubContent_row {
      display: flex;
      gap: 10px;
      margin-bottom: 16px;
      font-size: 22px;
      font-weight: 500;

      .SubContent_text {
        min-width: 120px;
        font-weight: bold;
        color: #999;
        margin-bottom: 18px;
      }

      .SubContent_re_text {
        min-width: 120px;
        //font-weight: bold;
        font-size: 22px;
      }

      .SubContent_re_text_note {
        width: 100%;
        max-height: 4em;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-word;
        margin-bottom: 18px;

        &::-webkit-scrollbar {
          width: 20px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${(props) => props.theme.colors.softGreen};
          border-radius: 10px;

          border: 7px solid white; /* 스크롤을 적용할 영역 색깔과 border 색상을 똑같이 맞춘다 */
        }
        &::-webkit-scrollbar-track {
          background-color: rgba(
            0,
            0,
            0,
            0
          ); /* 스크롤바 뒷 배경을 투명 처리한다 */
        }
      }
    }
  }

  @media (max-width: 1330px) {
    &.SubContent_main_wrap {
      padding: 0px 32px;
      display: flex;
      flex-direction: column;
      //gap: 60px;
      position: relative;

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
        justify-content: right;
        margin-top: 10px;
      }

      .SubContent_content {
        display: flex;
        flex-direction: column;
        gap: 26px;
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
      padding: 0px 30px 10px 30px;
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
        .SubContent_feedback_btn {
          font-family: "Gowun Batang", serif;
          font-weight: 400;
          font-style: normal;
          cursor: pointer;
          //border: none;
          box-shadow: none;
          font-size: 20px;
          //width: 150px;
          height: 45px;
        }
      }

      .SubContent_content {
        display: flex;
        flex-direction: column;
        gap: 26px;
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
      padding: 0px 10px 10px 10px;
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
        gap: 28px;
        padding-left: 10px;
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
         // 수평 스크롤 제거 */
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
