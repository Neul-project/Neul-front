import styled from "styled-components";

export const FeedBackModalStyled = styled.div`
  &.FeedbackModal_main_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 10px;

    .FeedbackModal_recording {
      display: none;

      .FeedbackModal_mic,
      .FeedbackModal_pause {
        cursor: pointer;
      }
    }
    .FeedbackModal_controler {
      display: none;
    }
    .FeedbackModal_footer {
      width: 100%;
      display: flex;
      justify-content: center;

      .FeedbackModal_footer_send,
      .FeedbackModal_footer_feeedback {
        width: 120px;
      }

      .FeedbackModal_footer_send {
        display: none;
      }
    }
  }

  @media (max-width: 768px) {
    &.FeedbackModal_main_wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 10px;

      .FeedbackModal_textarea {
        display: none;
      }
      .FeedbackModal_recording {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
      }
      .FeedbackModal_controler {
        display: block;
        .FeedbackModal_audio {
          width: 100%;
        }
      }
      .FeedbackModal_footer {
        width: 100%;
        display: flex;
        justify-content: center;

        .FeedbackModal_footer_send,
        .FeedbackModal_footer_feeedback {
          width: 120px;
        }

        .FeedbackModal_footer_send {
          display: flex;
        }
        .FeedbackModal_footer_feeedback {
          display: none;
        }
      }
    }
  }
`;
