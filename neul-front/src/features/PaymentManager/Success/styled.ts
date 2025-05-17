import styled from "styled-components";

export const PaymentSuccessStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.backColor};
  padding: 20px;

  .Success_container {
    width: 450px;
    padding: 20px;
    background-color: #fff;
    border-radius: 16px;
    margin-bottom: 15px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .padding {
    padding: 36px 50px;
  }

  .Success_firstBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Success_title {
    font-size: 24px;
  }

  .Success_orderNum {
    margin-bottom: 23px;

    span {
      color: ${(props) => props.theme.colors.pointGreen};
      font-weight: 700;
    }
  }

  .Success_cont {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: ${(props) => props.theme.colors.pointGreen};

    span {
      font-size: 21px;
      font-weight: 700;
    }
  }

  .Success_btnContainer {
    width: 100%;
    display: flex;
    gap: 10px;
  }

  .Success_goHome {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      padding: 9px;
      background-color: #8cc2a9;
      color: #fff;
      border: none;
      border-radius: 20px;
      font-size: 14px;
    }
  }

  .Success_goDetail {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      padding: 9px;
      background-color: #fff;
      color: #8cc2a9;
      border: 1px solid #8cc2a9;
      border-radius: 20px;
      font-size: 14px;
    }
  }

  .Success_orderInfo {
    margin-bottom: 10px;
    font-weight: 700;
  }

  .Success_goods {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
`;
