import styled from "styled-components";

export const PaymentSuccessStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: ${(props) => props.theme.colors.backColor};

  .Success_container {
    width: 450px;
    /* margin: 0 auto; */
    padding: 25px;
    background-color: #fff;
    border-radius: 16px;
  }

  .Success_title {
    font-size: 24px;
    margin: 0 0 30px 0;
  }

  .Success_cont {
  }

  .Success_btnContainer {
    display: flex;
    gap: 10px;
  }

  .Success_goHome {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      padding: 12px 17px;
      background-color: #8cc2a9;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 17px;
      font-weight: 700;
    }
  }

  .Success_goDetail {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      padding: 12px 17px;
      background-color: #fff;
      color: #8cc2a9;
      border: 1px solid #8cc2a9;
      border-radius: 12px;
      font-size: 17px;
      font-weight: 700;
    }
  }
`;
