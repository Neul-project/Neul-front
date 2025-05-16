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
      display: flex;
      //align-items: flex-end;
      align-items: center;
      justify-content: space-between;
      //margin-bottom: 30px;
      padding: 20px 0;
      align-items: center;
      font-size: 25px;
      //margin-bottom: 60px;
      font-weight: bolder;
    }
    .ProgramList_subtitle {
      border-top: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      align-items: center;

      padding: 10px 0px;
    }

    .ProgramList_grid_wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 30px 0px;
      padding: 30px 0;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
  }
`;
