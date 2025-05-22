import styled from "styled-components";

export const HelperAppStyled = styled.div`
  @media (max-width: 632px) {
    padding: 20px;
  }

  .HelperApp_container {
    /* width: 650px; */
    padding: 20px 20px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
      padding: 20px;
    }
  }

  .HelperApp_title {
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);
  }

  .HelperApp_Content {
    margin-bottom: 20px;
  }

  .HelperApp_btn {
    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      padding: 7px 14px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: ${(props) => props.theme.colors.pointGreen};
    }
  }
`;
