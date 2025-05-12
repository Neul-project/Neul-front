import styled from "styled-components";

export const ProgramDetailStyled = styled.div`
  &.ProgramDetail_main_wrap {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;

    .ProgramDetail_main {
      display: flex;
      justify-content: center;
      gap: 20px;

      .ProgramDetail_row {
        display: flex;
      }
    }
  }
`;
