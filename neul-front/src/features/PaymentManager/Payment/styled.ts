import styled from "styled-components";

export const PaymentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f5f8;
  padding: 20px;

  .Payment_title {
    font-size: 28px;
    font-weight: 600;
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

    .Payment_leftContainer {
      /* width: 60%; */

      .Program_info {
        width: 565px;
        background-color: #fff;
        margin-bottom: 20px;
        padding: 23px 21px;
        border-radius: 16px;

        .program_info_container {
          display: flex;
          align-items: flex-start;
          gap: 15px;
        }

        .program_info_imgDiv {
          width: 80px;
          height: 80px;

          img {
            width: 100%;
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

    .Payment_RightContainer {
      /* width: 38%; */

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
          }
        }

        .hr {
          padding: 8px 0;
          border-bottom: 2px solid #eee;
        }

        .T_amount {
          padding: 15px 0;

          .T_result {
            font-size: 19px;
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
          background-color: #9ac3b0;
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
