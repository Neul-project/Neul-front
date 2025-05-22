import styled from "styled-components";

export const HelperAppStyled = styled.div`
  .HelperApp_container {
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

  .HelperApp_title {
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);
  }

  .HelperApp_btn {
    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: #f6f6f8;
      border: none;
      padding: 9px 12px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: #747783;
    }
  }
`;
