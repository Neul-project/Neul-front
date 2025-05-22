import styled from "styled-components";

export const ChatViewStyled = styled.div`
  padding: 1rem;

  .back-btn {
    display: none;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      display: inline-block;
    }
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* 채팅 내용 */
  .chatroom_content_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -45%, 0);
    border-radius: 10px;
    background-color: white;
    max-width: 514px;
    width: 100%;
    max-height: 600px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .chatroom_bottom_button {
      position: fixed;
      bottom: 100px;
      right: 50px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: white;
      padding: 13px;
      border-radius: 50%;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
        cursor: pointer;
      }
    }

    .chatroom_content.scrollable {
      margin-bottom: 1px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      flex: 1;
      padding: 10px;
      box-sizing: border-box;
      .chatroom_date {
        text-align: center;
        color: #ccc;
        margin: 18px 0 22px 0;
      }
      &::-webkit-scrollbar {
        width: 20px;
      }
      &::-webkit-scrollbar-thumb {
        /* background-color: ${(props) => props.theme.colors.softGreen}; */
        background-color: #bbb;
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

    /* 메시지 보내는 부분 */
    .chatroom_message_box {
      display: flex;
      align-items: center;
      padding: 10px;
      border-top: 1px solid #ccc;
      .chatroom_message {
        width: 100%;
        input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          outline: none;
          border-radius: 20px;
          border: none;
          background-color: #eee;
        }
      }
      .chatroom_sendbtn {
        margin-left: 8px;
        font-size: 20px;
        padding: 8px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.pointGreen};
        color: white;
        &:hover {
          cursor: pointer;
        }
      }
      .chatroom_disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }
  }

  /* @media (max-width: 1029px) {
    .chatroom_content_box {
      transform: translate3d(-50%, -46.5%, 0);
      max-height: 93vh;
      border-radius: 0%;
    }
  } */
`;
