import styled from "styled-components";

export const StatusCheckStyled = styled.div`
  &.statuscheck_wrap {
    max-width: 700px;
    margin: 20px auto;
    padding: 0 10px;
    .statuscheck_box {
      min-height: 809.15px;
      padding: 32px;
      background-color: #fff;
      border-radius: 16px;
      border: 1px solid #ccc;
      .statuscheck_name {
        font-size: 22px;
        font-weight: bolder;
      }
      .statuscheck_date {
        display: flex;
        justify-content: flex-end;
        margin: 10px 0 20px 0;
      }

      .statuscheck_row {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 500;
        .statuscheck_title {
          min-width: 120px;
          font-weight: bold;
          color: #999;
        }
      }

      .statuscheck_explanation {
        margin-top: 40px;
        padding: 16px;
        background-color: #f9f9f9;
        border-radius: 8px;
        font-size: 14px;
        color: #666;
        line-height: 1.6;
        border: 1px solid #ddd;
      }

      .statuscheck_none {
        margin-top: 60px;
        text-align: center;
        font-size: 16px;
        color: #999;
      }
    }
  }
`;
