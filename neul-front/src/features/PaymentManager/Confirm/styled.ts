import styled from "styled-components";

export const ComfirmStyled = styled.div`
  height: 80vh;
  background-color: rgb(242, 245, 248);
  padding-top: 40px;

  @media (max-width: 632px) {
    padding: 50px 20px 20px 20px;
  }

  .Confirm_container {
    width: 375px;
    margin: 0 auto;
    text-align: center;
    background-color: #fff;
    border-radius: 16px;
    padding: 20px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .Confirm_title {
    font-size: 21px;
    font-weight: 500;
    margin-bottom: 13px;
  }

  .Confirm_content {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .Confirm_btn {
    button {
      cursor: pointer;
      width: 40%;
      height: 38px;
      margin-top: 10px;
      border: 1px solid #5da487;
      border-radius: 50px;
      background-color: #fff;
      color: #5da487;
      font-weight: 700;
      font-size: 14px;
    }
  }
`;
