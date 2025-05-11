import styled from "styled-components";

export const ProgramElementStyled = styled.div`
  &.ProgramElement_main_wrap {
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    background: #5da487;
    margin-bottom: 30px;
    cursor: pointer;

    .ProgramElement_title {
      padding: 5px;
      font-size: 23px;
      color: white;
      font-weight: bold;
    }
    .ProgramElement_progress,
    .ProgramElement_category,
    .ProgramElement_recru,
    .ProgramElement_capacity {
      padding: 5px;
      color: white;
    }

    .ProgramElement_img {
      margin: 0px auto;
      width: 90%;
      height: 200px;
      background-color: white;
    }
  }
`;
