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

    .ProgramDetail_share {
      display: flex;
      align-items: center;
      cursor: pointer;
      .ProgramDetail_imgstyle {
        width: 100%;
        height: 100%;
      }
    }
    .ProgramDetail_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //margin-bottom: 20px;
      padding: 20px 0px;
      gap: 20px;

      .ProgramDetail_top_left {
        display: flex;
        gap: 20px;
      }

      .ProgramDetail_ing {
        display: flex;
        align-items: center;
        text-align: center;
        padding: 0 10px;
        width: 64px;
        height: 64px;
        background: #5da487;
        color: #fff;
        font-size: 15px;
      }
      .ProgramDetail_ing_end {
        background-color: #f0f0f0;
        color: #999;
        white-space: pre-line;
      }

      .ProgramDetail_title {
        margin-top: 5px;
        color: #333;
        font-size: 32px;
        font-family: "NS";
        font-weight: normal;
        letter-spacing: -0.045em;
        //text-align: center;
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
        background: #5da487;
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
      .ProgramDetail_Dir.disabled,
      .ProgramDetail_Dir:disabled,
      .ProgramDetail_show.disabled,
      .ProgramDetail_show:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
        opacity: 0.7;
        pointer-events: none;
        //transition: background-color 0.3s;
      }
    }
  }

  @media (max-width: 768px) {
    &.ProgramDetail_main_wrap {
      max-width: 1280px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0px auto;
      padding: 0px 40px;

      .ProgramDetail_share {
        display: flex;
        align-items: center;
        cursor: pointer;
        .ProgramDetail_imgstyle {
          width: 80%;
          height: 80%;
        }
      }

      .ProgramDetail_top {
        display: flex;
        //flex-direction: column;
        align-items: center;
        //margin-bottom: 20px;
        padding: 15px 0px;
        gap: 15px;

        .ProgramDetail_top_left {
          display: flex;
          flex-direction: column;
          gap: 0px;
          width: 80%;
        }

        .ProgramDetail_ing {
          display: flex;
          align-items: center;
          text-align: center;
          padding: 0 10px;
          width: 64px;
          height: 30px;
          background: #5da487;
          color: #fff;
          font-size: 14px;
        }
        .ProgramDetail_ing_end {
          background-color: #f0f0f0;
          color: #999;
          white-space: pre-line;
        }

        .ProgramDetail_title {
          margin-top: 5px;
          color: #333;
          font-size: 28px;
          font-family: "NS";
          font-weight: normal;
          letter-spacing: -0.045em;

          /* white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; */
        }
      }

      .ProgramDetail_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        width: 100%;
        padding: 30px 0px;
        border-top: 2px solid #ccc;

        .ProgramDetail_img {
          width: 100%;
          height: 100%;
        }
        .ProgramDetail_content {
          width: 100%;
          height: 100%;
        }
      }

      .ProgramDetail_btns {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding-bottom: 20px;

        .ProgramDetail_Dir {
          padding: 12px 0;
          margin: 0 2px;
          width: 140px;
          background: #5da487;
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          border: none;
          cursor: pointer;
        }
        .ProgramDetail_show {
          padding: 12px 0;
          margin: 0 2px;
          width: 140px;
          background: #fff;
          border: 1px solid #d5d5d5;
          color: #666;
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
        }
        .ProgramDetail_Dir.disabled,
        .ProgramDetail_Dir:disabled,
        .ProgramDetail_show.disabled,
        .ProgramDetail_show:disabled {
          background-color: #ccc;
          color: #666;
          cursor: not-allowed;
          opacity: 0.7;
          pointer-events: none;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.ProgramDetail_main_wrap {
      max-width: 1280px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0px auto;
      padding: 0px 40px;

      .ProgramDetail_share {
        display: flex;
        align-items: center;
        cursor: pointer;

        .ProgramDetail_imgstyle {
          width: 80%;
          height: 80%;
        }
      }

      .ProgramDetail_top {
        display: flex;
        align-items: center;
        //margin-bottom: 20px;
        padding: 15px 0px;
        gap: 15px;

        .ProgramDetail_top_left {
          display: flex;
          flex-direction: column;
          gap: 0px;
          width: 80%;
        }

        .ProgramDetail_ing {
          display: flex;
          align-items: center;
          text-align: center;
          padding: 0 10px;
          width: 55px;
          height: 30px;
          background: #5da487;
          color: #fff;
          font-size: 12px;
        }
        .ProgramDetail_ing_end {
          background-color: #f0f0f0;
          color: #999;
          white-space: pre-line;
        }

        .ProgramDetail_title {
          margin-top: 5px;
          color: #333;
          font-size: 20px;
          font-family: "NS";
          font-weight: normal;
          letter-spacing: -0.045em;

          /* white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; */
        }
      }

      .ProgramDetail_main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        width: 100%;
        padding: 15px 0px;
        border-top: 2px solid #ccc;

        .ProgramDetail_img {
          width: 100%;
          height: 100%;
        }
        .ProgramDetail_content {
          width: 100%;
          height: 100%;
        }
      }

      .ProgramDetail_btns {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        padding-bottom: 20px;
        margin: 0px auto;
        margin-top: 10px;

        .ProgramDetail_Dir {
          padding: 12px 0;
          margin: 0 2px;
          width: 140px;
          background: #5da487;
          color: #fff;
          font-size: 14px;
          line-height: 20px;
          border: none;
          cursor: pointer;
        }
        .ProgramDetail_show {
          padding: 12px 0;
          margin: 0 2px;
          width: 140px;
          background: #fff;
          border: 1px solid #d5d5d5;
          color: #666;
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
        }
        .ProgramDetail_Dir.disabled,
        .ProgramDetail_Dir:disabled,
        .ProgramDetail_show.disabled,
        .ProgramDetail_show:disabled {
          background-color: #ccc;
          color: #666;
          cursor: not-allowed;
          opacity: 0.7;
          pointer-events: none;
        }
      }
    }
  }
`;
