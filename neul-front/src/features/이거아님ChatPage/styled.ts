import styled from "styled-components";

export const ChatPageStyled = styled.div`
  &.chat_wrap {
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

    /* 기본적으로 두 컴포넌트 모두 보이도록 설정 */
    .chat_room_list,
    .chat_view {
      display: block;
    }

    /* 모바일일 때 조건부로 숨김 처리 */
    @media (max-width: 768px) {
      .hide_on_mobile {
        display: none;
      }
    }
  }
`;
