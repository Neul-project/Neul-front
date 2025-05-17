import styled from "styled-components";

export const PaymentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f5f8;
  padding: 20px;

  .Payment_title {
    font-size: 28px;
    font-weight: 500;
    padding: 30px 0 48px;
  }

  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 28px;
    color: #333;
  }

  .Payment_container {
    display: flex;
    gap: 20px;
    margin: 0 auto;
    margin-bottom: 100px;
    /* overflow: visible; */

    .Payment_leftContainer {
      /* width: 60%; */

      .Program_info {
        width: 565px;
        background-color: #fff;
        padding: 23px 21px;
        border-radius: 16px;

        .program_info_container {
          display: flex;
          align-items: flex-start;
          gap: 17px;
          margin-bottom: 24px;

          .Program_info_label {
            word-break: break-all;
            display: flex;
            align-items: center;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;

            .Program_labelInput {
              appearance: none;
              position: absolute;
              width: 1px;
              height: 1px;
              border: none;
              opacity: 0;
              overflow: hidden;
            }
          }

          .Program_info_div {
            border: 2px solid #cbd1d7;
            border-radius: 4px;
            width: 20px;
            height: 20px;
            box-sizing: border-box;
            flex-shrink: 0;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-color: #fff;
          }

          .checked {
            border: 2px solid #222;
            background-color: #222;
            background-image: url("/check.svg");
          }
        }

        .program_info_imgDiv {
          width: 77px;
          height: 77px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .p_manager {
          font-size: 14px;
          color: gray;
        }

        .p_price {
          font-size: 16px;
          font-weight: 700;
        }
      }

      .Orderer_info {
        width: 565px;
        background-color: #fff;
        padding: 23px 21px;
        border-radius: 16px;
        margin-bottom: 20px;

        .Orderder_info_container {
          .O_orderer {
            margin-bottom: 5px;
            font-size: 15px;
          }

          .O_phone {
            margin-bottom: 5px;
            font-size: 13px;
            color: gray;
          }

          .O_email {
            font-size: 13px;
            color: gray;
          }
        }
      }
    }

    .Payment_empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 15px;

      .empty_img {
        margin-top: 15px;
        margin-bottom: 10px;
      }

      .empty_cont {
        margin-bottom: 30px;
      }
    }

    .Payment_RightContainer {
      position: relative;

      .Payment_RightSubContainer {
        position: sticky;
        top: 100px;
        right: 0;
        z-index: 10;
      }

      .Total_amount {
        width: 375px;
        background-color: #fff;
        border-radius: 16px;
        margin-bottom: 20px;
        padding: 23px 21px;

        .T_flex {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;

          .T_column {
            color: #aaa;
            font-size: 15px;
          }
        }

        .hr {
          padding: 8px 0;
          border-bottom: 2px solid #eee;
        }

        .T_amount {
          padding: 15px 0;

          .T_result {
            font-family: "Pretendard", sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #3c7d62;
          }
        }
      }

      .T_btn {
        width: 100%;

        button {
          cursor: pointer;
          width: 100%;
          padding: 17px;
          background-color: #8cc2a9;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 17px;
          font-weight: 700;
        }
      }
    }
  }
`;
