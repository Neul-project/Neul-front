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

    .ProgramDetail_top {
      display: flex;
      align-items: center;
      //margin-bottom: 20px;
      padding: 20px 0px;
      gap: 20px;

      .ProgramDetail_ing {
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0 10px;
        width: 64px;
        height: 64px;
        background: #3d7a99;
        color: #fff;
        font-size: 15px;
        font-family: "NBGB";
        box-sizing: border-box;
      }

      .ProgramDetail_title {
        //margin-top: 20px;
        color: #333;
        font-size: 32px;
        font-family: "NS";
        font-weight: normal;
        letter-spacing: -0.045em;
      }
    }

    .ProgramDetail_main {
      display: flex;
      justify-content: center;
      gap: 20px;
      width: 100%;
      padding: 30px 0px;
      border-top: 2px solid #ccc;

      .ProgramDetail_img {
        width: 43%;
        height: 100%;
      }
      .ProgramDetail_content {
        width: 57%;
        height: 100%;
      }
    }

    .ProgramDetail_btns {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding-bottom: 20px;

      .ProgramDetail_Dir {
        padding: 14px 0;
        margin: 0 2px;
        width: 160px;
        background: #3d7a99;
        color: #fff;
        font-size: 16px;
        font-family: "NBGB";
        line-height: 20px;
        border: none;
        cursor: pointer;
      }
      .ProgramDetail_show {
        padding: 13px 0;
        margin: 0 2px;
        width: 160px;
        background: #fff;
        border: 1px solid #d5d5d5;
        color: #666;
        font-size: 16px;
        font-family: "NBGB";
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
`;
