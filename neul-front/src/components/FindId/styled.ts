import styled from "styled-components";

export const FindIdStyled = styled.div`
  height: 100vh;

  .FindId_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .FindId_InputContainer {
    width: 375px;
  }

  .input_subContainer {
    margin-bottom: 15px;
  }

  .FindId_title {
    padding: 50px 0 48px;
    font-size: 26px;
    font-weight: 500;
  }

  .FindId_name {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .FindId_input {
    width: 100%;
    padding: 9px 9px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  .FindId_sub {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      height: 42px;
      margin-top: 10px;
      border: 1px solid #5da487;
      border-radius: 8px;
      background-color: #fff;
      color: #5da487;
      font-weight: 700;
      font-size: 16px;
    }
  }

  span {
    color: rgb(238, 106, 123);
  }

  .error {
    font-size: 13px;
    color: rgb(238, 106, 123);
  }
`;
