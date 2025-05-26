import styled from "styled-components";

export const ComfirmStyled = styled.div`
  height: 70vh;
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
    /* border-radius: 16px; */
    padding: 30px 43px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .Confirm_title {
    font-size: 21px;
    font-weight: 500;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  .Confirm_content {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .name {
    color: #9c9c9c;
  }

  .amount {
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #ddd;
  }

  .pay {
    font-size: 19px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.pointGreen};
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
