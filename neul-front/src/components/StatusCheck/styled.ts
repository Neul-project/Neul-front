import styled from "styled-components";

export const StatusCheckStyled = styled.div`
  &.statuscheck_wrap {
    width: 100%;
    position: absolute;
    z-index: 25;
    padding: 0 32px;
    position: relative;

    .statuscheck_clip_box {
      display: none;
      width: 130px;
      position: absolute;
      top: -25px;
      left: -10px;
      .statuscheck_clip {
        width: 100%;
        height: 100%;
      }
    }

    @media (max-width: 1330px) {
      .statuscheck_clip_box {
        display: block;
      }
    }

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
        box-shadow: 0 -8px 42px rgba(0, 0, 0, 0.06);
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
        box-shadow: 0 -8px 42px rgba(0, 0, 0, 0.06);
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
          box-shadow: 0 -8px 42px rgba(0, 0, 0, 0.06);
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
          box-shadow: 0 -8px 42px rgba(0, 0, 0, 0.06);
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
        padding: 57px 18px 0 10px;
      }

      .statuscheck_row {
        display: flex;
        gap: 10px;
        margin-bottom: 16px;
        font-size: 22px;
        font-weight: 500;
        .statuscheck_title {
          min-width: 120px;
          font-weight: bold;
          color: #999;
        }
      }

      .statuscheck_info {
        padding: 39px 0px 5px 24px;
      }

      .statuscheck_none {
        margin-top: 69px;
        display: flex;
        justify-content: center;
        font-size: 25px;
        color: #999;
      }
    }

    .statuscheck_title.statuscheck_margin {
      margin-bottom: 18px;
    }
    .statuscheck_value.scrollable {
      max-height: 3em;
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
