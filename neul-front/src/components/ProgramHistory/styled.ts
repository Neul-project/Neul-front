import styled from "styled-components";

export const ProgramHistoryStyled = styled.div`
  @media (max-width: 632px) {
    padding: 0 20px;
  }

  .ProgramHistory_container {
    width: 650px;
    padding: 20px 20px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .ProgramHistory_title {
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);

    @media (max-width: 632px) {
      font-size: 16px;
      padding-bottom: 10px;
    }
  }

  .ProgramHistory_item_container {
    padding: 20px 0px;

    .ProgramHistory_empty {
      display: flex;
      flex-direction: column;
      align-items: center;

      .empty_img {
        margin-top: 10px;
        margin-bottom: 7px;
      }
    }

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
      margin-bottom: 10px;
      /* min-height: 111px; */

      @media (max-width: 632px) {
        padding: 12px;
      }

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

            @media (max-width: 632px) {
              font-size: 14px;
            }

            &:hover {
              text-decoration: underline;
            }
          }

          .payment {
            font-size: 14px;
            color: gray;

            @media (max-width: 632px) {
              font-size: 11px;
            }
          }

          .price {
            font-size: 13px;
            color: #565e67;

            @media (max-width: 632px) {
              font-size: 11px;
            }
          }
        }

        .manager {
          font-size: 14px;

          @media (max-width: 632px) {
            font-size: 12px;
          }
        }

        .flex-end {
          justify-content: flex-end;
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;

    .number_btn {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-top: 1px solid rgb(221, 221, 221);
      border-right: 1px solid rgb(221, 221, 221);
      border-bottom: 1px solid rgb(221, 221, 221);
      border-image: initial;
      border-left: none;
      cursor: pointer;

      @media (max-width: 632px) {
        width: 26px;
        height: 26px;
      }
    }

    .number_btn.start {
      border-left: 1px solid rgb(221, 221, 221);
    }

    button {
      cursor: pointer;
      border: none;
      background-color: transparent;
    }
  }

  .error {
    font-size: 13px;
    color: rgb(240, 63, 64);
    line-height: 20px;
    padding-left: 4px;
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

  @media (max-width: 632px) {
    font-size: 11px;
    padding: 1px 8px;
  }
`;
