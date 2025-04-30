import styled from "styled-components";

export const ChatRoomStyled = styled.div`
  &.chatroom_wrap {
    /* 채팅 헤더 */
    .chatroom_header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
      border-bottom: 1.5px solid #ccc;
      background-color: white;
      /* 뒤로가기 버튼 */
      .chatroom_backicon_box {
        width: 40px;
        margin-left: 10px;
        .chatroom_backicon {
          width: 100%;
          height: 100%;
          &:hover {
            cursor: pointer;
          }
        }
      }
      /* 1:1채팅 */
      .chatroom_title {
        width: 100%;
        text-align: center;
        font-size: large;
        font-weight: 700;
      }
    }

    /* 채팅 내용 */
    .chatroom_content_box {
      max-width: 1028px;
      height: 100vh;
      margin: 0 auto;
      padding-top: 70px;
      display: flex;
      flex-direction: column;
      border-left: 1.5px solid #ccc;
      border-right: 1.5px solid #ccc;
      .chatroom_content {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        box-sizing: border-box;
        .chatroom_date {
          text-align: center;
          color: #ccc;
          margin-top: 20px;
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
  }
`;
