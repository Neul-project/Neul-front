import styled from "styled-components";

export const PaymentFailStyled = styled.div`
  background-color: ${(props) => props.theme.colors.backColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  padding: 20px;

  .Fail_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 450px;
    padding: 20px;
    background-color: #fff;
    border-radius: 16px;
    margin-bottom: 15px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .Fail_X {
    font-size: 40px;
    color: #e50000;
  }

  .Fail_title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
  }

  .Fail_btn {
    margin-top: 20px;

    button {
      cursor: pointer;
      width: 100%;
      padding: 9px 18px;
      background-color: #fff;
      color: #8cc2a9;
      border: 1px solid #8cc2a9;
      border-radius: 20px;
      font-size: 14px;
    }
  }
`;
