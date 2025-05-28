import styled from "styled-components";

export const NoteBookStyled = styled.div`
  &.notebook_wrap {
    font-family: "Gowun Batang", serif;
    font-weight: 400;
    font-style: normal;
    max-width: 1280px;
    width: 100%;
    //min-height: 809.15px;
    margin: 0 auto;
    height: 100%;
    min-height: calc(100vh - 155px);

    .notebook_box {
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 809.15px;
      margin: 40px auto;
    }
  }
`;
