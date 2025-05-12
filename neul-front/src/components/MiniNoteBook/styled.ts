import styled from "styled-components";

export const MiniNoteBookStyled = styled.div`
  &.mininotebook_wrap {
    .mininotebook_box {
      position: relative;
      padding-top: 50px; /* 고리 공간 확보 */
    }

    .mininotebook_spring {
      position: absolute;
      top: 25px;
      left: 10px;
      width: 100%;
      max-width: 680px;
      height: 50px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      pointer-events: none;
      z-index: 21;
    }

    .mininotebook_ring {
      width: 24px;
      height: 60px;
      border-radius: 50px;
      background: #ccc;
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
    }
  }
`;
