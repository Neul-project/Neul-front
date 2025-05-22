import styled from "styled-components";

export const RoomListStyled = styled.div`
  padding: 1rem;
  display: flex;

  .chatroom_select {
    overflow-y: scroll;
    width: 35%;
    height: 82vh;
    border-top: 1.5px solid #ccc;
    border-left: 1.5px solid #ccc;
    border-bottom: 1.5px solid #ccc;
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
  .chat-room-item {
    cursor: pointer;
    padding: 10px;
    border-bottom: 1px solid #ccc;

    &:hover {
      background-color: #f9f9f9;
    }
  }
`;
