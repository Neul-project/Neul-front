import styled from "styled-components";

export const ProgramContentStyled = styled.div`
  &.ProgramContent_main_wrap {
    width: 100%;
    height: 100%;

    .ProgramDetail_row {
      display: flex;
      align-items: center;
      //gap: 10px;
      padding: 5px 0px;
      overflow: hidden;
      margin-top: 8px;
      font-size: 15px;
      line-height: 24px;

      .ProgramDetail_row_title {
        display: inline-block;
        justify-content: left;
        position: relative;
        margin-right: 15px;
        width: 120px;
        color: #444;
        border-right: 1.5px solid #ccc;
      }
      .ProgramDetail_row_detail {
        display: flex;
        width: calc(100% - 92px);
      }
    }
  }
`;
