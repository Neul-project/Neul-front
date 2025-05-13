import styled from "styled-components";

export const ProgramListStyled = styled.div`
  &.ProgramList_main_wrap {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0px auto;
    padding: 0px 20px;

    .ProgramList_title {
      padding-top: 50px;
      align-items: center;
      text-align: center;
      font-size: 25px;
      margin-bottom: 60px;
      font-weight: bolder;
    }

    .ProgramList_grid_wrap {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      padding-bottom: 10px;
    }
  }
`;
