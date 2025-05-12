import styled from "styled-components";

export const PaymentStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;

  .Payment_title {
    font-size: 24px;
    padding: 28px 0;
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
        width: 500px;
        background-color: #fff;
        margin-bottom: 20px;
        padding: 23px 21px;

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
        width: 500px;
        background-color: #fff;
        padding: 23px 21px;

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
        width: 350px;
        background-color: #fff;
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

      .Pay_method {
        width: 350px;
        background-color: #fff;
        padding: 23px 21px;
      }

      .Pay_btn {
        width: 100%;

        button {
          cursor: pointer;
          width: 100%;
          border: none;
          padding: 15px 18px;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          background-color: #9ac3b0;
        }
      }
    }
  }
`;
