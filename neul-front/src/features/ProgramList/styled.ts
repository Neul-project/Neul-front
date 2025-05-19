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
      font-size: 30px;
      //margin-bottom: 60px;
      font-weight: bolder;
    }
    .ProgramList_subtitle {
      //border-top: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: end;
      //padding: 10px 0px;
    }

    .ProgramList_grid_wrap {
      display: grid;
      grid-template-columns: repeat(4, 1fr); /* 4열로 고정 */
      gap: 20px;
      padding: 20px 0;
      //border-bottom: 1px solid #ccc;
      //border-top: 1px solid #ccc;
    }

    .ProgramList_empty_message {
    }

    .ProgramList_pagination {
      /* 페이지 번호 버튼 테두리 */
      .ant-pagination-item {
        border-color: none !important; /* 원하는 테두리 색상으로 변경 */
      }
      /* 활성화된 페이지 버튼 테두리 */
      .ant-pagination-item-active {
        border-color: #5da487 !important;
      }

      .ant-pagination-item-active a {
        color: #5da487;
      }
    }
  }

  @media (max-width: 768px) {
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
        //border-top: 1px solid #ccc;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        //padding: 10px 0px;
      }

      .ProgramList_grid_wrap {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 4열로 고정 */
        gap: 20px;
        padding: 20px 0;
        //border-bottom: 1px solid #ccc;
        //border-top: 1px solid #ccc;
      }
    }
  }

  @media (max-width: 486px) {
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
        font-size: 20px;
        //margin-bottom: 60px;
        font-weight: bolder;
      }
      .ProgramList_subtitle {
        //border-top: 1px solid #ccc;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
        //padding: 10px 0px;
      }

      .ProgramList_grid_wrap {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        padding: 20px 0;
        //border-bottom: 1px solid #ccc;
        //border-top: 1px solid #ccc;
      }
    }
  }

  @media (max-width: 375px) {
    &.ProgramList_main_wrap {
      .ProgramList_grid_wrap {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        padding: 20px 0;
        //border-bottom: 1px solid #ccc;
        //border-top: 1px solid #ccc;
      }
    }
  }
`;
