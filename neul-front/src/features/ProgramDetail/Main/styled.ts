import styled from "styled-components";

export const ProgramDetailStyled = styled.div`
  &.ProgramDetail_main_wrap {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0px auto;
    padding: 0px 40px;

    .ProgramDetail_title {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: left;
      align-items: center;
      padding-left: 40px;
      font-size: 25px;
      border-bottom: 1px solid black;
    }
    .ProgramDetail_main {
      display: flex;
      justify-content: center;
      gap: 20px;
      width: 100%;
      padding: 30px 0px;

      .ProgramDetail_img,
      .ProgramDetail_content {
        width: 50%;
        height: 400px;
      }
    }

    .ProgramDetail_btns {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding-bottom: 20px;
    }
  }
`;
