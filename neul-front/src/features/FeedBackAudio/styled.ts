import styled from "styled-components";

export const FeedBackAudioStyled = styled.div`
  &.FeedBackAudio_main_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 10px;
    //gap: 10px;

    .FeedBackAudio_recording {
      display: flex;
      flex-direction: row;
      justify-content: center;
      //gap: 10px;
    }

    .FeedBackAudio_state {
      font-size: 12px;
    }
    .FeedBackAudio_controler {
      display: block;
      margin: 10px 0px;
      .FeedBackAudio_audio {
        width: 100%;
      }
    }
    .FeedBackAudio_footer {
      width: 100%;
      display: flex;
      justify-content: center;

      .FeedBackAudio_footer_send {
        width: 120px;
      }
    }
  }
`;
