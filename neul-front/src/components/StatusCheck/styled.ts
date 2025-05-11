import styled from "styled-components";

export const StatusCheckStyled = styled.div`
  &.statuscheck_wrap {
    max-width: 700px;
    width: 100%;
    &.notbook_wrap {
      margin: 20px auto;
      padding-bottom: 20px;
    }
    &.book_wrap {
      position: absolute;
      z-index: 25;
    }
    padding: 0 10px;

    .statuscheck_box {
      &.notbook_box::before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 4px;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
        z-index: -1;
      }
    }
    .statuscheck_box {
      &.notbook_box::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 8px;
        width: 100%;
        height: 100%;
        border-radius: 16px;
        background: white;
        box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.06);
        z-index: -2;
      }
    }

    .statuscheck_box {
      &.notbook_box {
        position: relative;
        z-index: 20;
        min-height: 809.15px;
        padding: 32px;
        background-color: #fff;
        border-radius: 16px;

        &::before {
          /* 위쪽 종이 그림자 */
          content: "";
          position: absolute;
          top: -4px;
          right: 4px;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: white;
          box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.06);
          z-index: -1;
        }

        &::after {
          /* 아래쪽 종이 그림자 */
          content: "";
          position: absolute;
          bottom: -8px;
          left: 8px;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: white;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.06);
          z-index: -2;
        }
      }

      .statuscheck_name {
        font-size: 22px;
        font-weight: bolder;
      }
      .statuscheck_date {
        display: flex;
        justify-content: flex-end;

        &.notbook_date {
          margin: 10px 0 20px 0;
        }
        &.book_date {
          padding-top: 20px;
        }
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
        &.notbook_explanation {
          display: none;
        }
      }

      .statuscheck_info {
        padding: 10px 5px 5px 50px;
      }

      .statuscheck_none {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        font-size: 16px;
        color: #999;
      }
    }

    .statuscheck_title.statuscheck_margin {
      margin-top: 15px;
    }
    .statuscheck_value.scrollable {
      margin-top: 15px;
      max-height: 7.5em;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      &::-webkit-scrollbar {
        width: 20px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.colors.softGreen};
        border-radius: 10px;

        border: 7px solid white; /* 스크롤을 적용할 영역 색깔과 border 색상을 똑같이 맞춘다 */
      }
      &::-webkit-scrollbar-track {
        background-color: rgba(
          0,
          0,
          0,
          0
        ); /* 스크롤바 뒷 배경을 투명 처리한다 */
      }
    }
  }
`;
