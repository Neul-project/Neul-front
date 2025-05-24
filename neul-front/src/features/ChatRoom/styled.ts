import styled from "styled-components";

export const ChatRoomStyled = styled.div`
  &.chatroom_wrap {
    background-color: rgb(242, 245, 248);
    height: 100vh;
    overflow: hidden;
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
      } /* 1:1채팅 */
      .chatroom_title {
        width: 100%;
        text-align: center;
        font-size: large;
        font-weight: 700;
      }
    }
    .chatroom_select {
      overflow-y: scroll;
      width: 35%;
      background-color: white;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      .chatroom_unpeople {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
      }
      .chatroom_item {
        height: 65.3px;
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;

        &.selected {
          background-color: #f5f5f5;
        }
        .chatroom_name_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .chatroom_name {
            display: flex;
            font-weight: bold;
            width: 180px;
            .chatroom_stick {
              margin: 0 5px;
            }
            .chatroom_patientname,
            .chatroom_username {
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;

              display: -webkit-box;
              -webkit-line-clamp: 1; // 원하는 라인수
              -webkit-box-orient: vertical;
            }

            span {
              font-size: 14px;
            }
          }
          .chatroom_lasttime {
            font-size: 0.75rem;
            color: #999;
            margin-top: 2px;
          }
        }

        .chatroom_lastmessage_box {
          color: #555;
          font-size: 0.9rem;
          margin-top: 4px;
          display: flex;
          justify-content: space-between;

          .chatroom_lastmessage {
            width: 250px;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;

            display: -webkit-box;
            -webkit-line-clamp: 1; // 원하는 라인수
            -webkit-box-orient: vertical;
          }
          .chatroom_unread {
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: red;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 12px;
          }
        }
      }
    }

    .chatroom_wrap_box {
      height: 100%;
      overflow-y: auto;
      background: #f5f5f5;
      padding: 0.5rem 0.5rem;

      .chatroom_box_wrap {
        padding: 1.5rem 1.5rem;
        border-radius: 10px;
        background: white;
        height: 91%;
        margin-top: 69px;

        /* 채팅 전체 */
        .chatroom_box {
          display: flex;
          width: 100%;
          height: 100%;
          margin: 0 auto;

          @media (max-width: 1035px) {
            .close {
              display: none;
            }
            .chatroom_select {
              width: 100%;
            }
            .chatroom_content_box {
              width: 100%;
            }
          }
        }
      }
    }

    /* 채팅 내용 */
    .chatroom_content_box {
      position: relative;
      width: 65%;
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 0.7px solid #ccc;
      overflow: hidden;
      height: 100%;

      .chatroom_scroll_wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        background-color: white;
        /* 채팅방 헤더 */
        .chatroom_content_header {
          position: sticky;
          display: flex;
          justify-content: space-between;
          top: 0;
          z-index: 10;
          background-color: white;
          padding: 15px;
          .chatroom_moreicon,
          .chatroom_backicon {
            cursor: pointer;
          }
          .chatroom_header_name {
            display: flex;
            align-items: flex-start;
            font-weight: bold;

            .chatroom_backicon {
              margin-right: 15px;
            }
          }
        }

        /* 채팅창 내용 */
        .chatroom_scroll_body {
          overflow-y: auto;
          flex-grow: 1;
          padding: 10px;
        }
      }

      .chatroom_bottom_button {
        position: absolute;
        bottom: 90px;
        right: 30px;
        background-color: ${(props) => props.theme.colors.pointGreen};
        color: white;
        padding: 13px 13px 12px 13px;
        border-radius: 50%;
        font-size: 16px;
        z-index: 1000;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        &:hover {
          background-color: ${(props) => props.theme.colors.softGreen};
          cursor: pointer;
        }
      }

      .chatroom_content {
        flex: 1;
        overflow-y: auto;
        box-sizing: border-box;
        .chatroom_date {
          text-align: center;
          color: #ccc;
          margin-top: 20px;
        }
        .chatroom_uncontent {
          color: #999;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
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
