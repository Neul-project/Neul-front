import styled from "styled-components";

export const StatusCheckStyled = styled.div`
  &.statuscheck_wrap {
    position: absolute;
    z-index: 25;
    max-width: 700px;
    width: 100%;
    &.notbook_wrap {
      margin: 20px auto;
    }
    padding: 0 10px;
    .statuscheck_box {
      &.notbook_box {
        min-height: 809.15px;
        padding: 32px;
        background-color: #fff;
        border-radius: 16px;
        border: 1px solid #ccc;
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
