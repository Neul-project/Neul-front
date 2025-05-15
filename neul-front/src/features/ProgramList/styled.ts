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
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 30px 0;
      border-bottom: 1px solid #ccc;
      padding-top: 50px;
      align-items: center;
      font-size: 25px;
      margin-bottom: 60px;
      font-weight: bolder;
    }

    .ProgramList_grid_wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 30px 0;
      padding: 30px 0;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }
  }
`;
