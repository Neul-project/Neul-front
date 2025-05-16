import styled from "styled-components";

export const ChatRoomStyled = styled.div`
  &.chatroom_wrap {
    background-color: rgb(242, 245, 248);
    height: 100vh;
    /* 채팅 헤더 */
    .chatroom_header {
      top: 0px;
      position: fixed;
      z-index: 1;
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.07);
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

      /* 메시지 전체 삭제 */
      .chatroom_more_btn {
        width: 50px;
        padding-right: 20px;
        .chatroom_moreicon {
          width: 100%;
          height: 100%;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    /* 채팅 내용 */
    .chatroom_content_box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -45%, 0);
      border-radius: 10px;
      background-color: white;
      max-width: 1028px;
      width: 100%;
      height: 700px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      .chatroom_content {
        flex: 1;
        overflow-y: scroll;

        /* Firefox */
        /* scrollbar-width: none; */
        /* IE 10+ */
        /* -ms-overflow-style: none; */

        padding: 10px;
        box-sizing: border-box;
        .chatroom_date {
          text-align: center;
          color: #ccc;
          margin: 18px 0 22px 0;
        }
      }

      .chatroom_content::-webkit-scrollbar {
        /* Chrome, Safari, Edge */
        /* display: none; */
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

    @media (max-width: 1029px) {
      .chatroom_content_box {
        transform: translate3d(-50%, -46.5%, 0);
        height: 93vh;
        border-radius: 0%;
      }
    }
  }
`;
