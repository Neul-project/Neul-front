import styled from "styled-components";

export const ProgramHistoryStyled = styled.div`
  .ProgramHistory_container {
    width: 650px;
    padding: 20px 20px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;
  }

  .ProgramHistory_title {
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);
  }

  .ProgramHistory_item_container {
    padding: 20px 0px;

    .ProgramHistory_item_box {
      position: relative;
      display: flex;
      flex-direction: column;
      -webkit-box-pack: justify;
      justify-content: space-between;
      border: 1px solid #dfe4eb;
      border-radius: 16px;
      background-color: #fff;
      padding: 12px 12px 16px 20px;
      /* min-height: 111px; */

      .ProgramHistory_semicircle {
        position: absolute;
        right: -8px;
        top: calc(50% - 8px);
        width: 16px;
        height: 16px;
        background-color: #fff;
        border: 1px solid #dfe4eb;
        border-radius: 16px;

        &::after {
          content: "";
          position: absolute;
          right: -4px;
          top: -1px;
          width: 10px;
          height: 20px;
          background-color: #fff;
        }
      }

      .ProgramHistory_content_wrap {
        /* display: flex;
        gap: 12px;
        height: 82px; */

        .ProgramHistory_number {
          /* align-self: center; */
          font-size: 12px;
          color: gray;
          display: inline-block;
        }

        .ProgramHistory_content {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .p_name {
            font-size: 19px;
            font-weight: 700;
          }

          .payment {
            font-size: 14px;
            color: gray;
          }

          .price {
            font-size: 13px;
            color: #565e67;
          }
        }

        .manager {
          font-size: 14px;
          /* color: gray; */
        }

        .flex-end {
          justify-content: flex-end;
        }
      }
    }
  }
`;

export const Cell = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  text-align: center;
  /* border-bottom: 1px solid #ddd; */
`;

export const Btn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #5da487;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -1px;
  color: ${(props) => props.theme.colors.pointGreen};
`;
