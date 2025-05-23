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
    margin-top: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .HelperApp_flexbox {
    display: flex;
    justify-content: space-between;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .helper {
    font-size: 16px;
    font-weight: 400;
  }

  .status {
    font-size: 14px;
    font-weight: 400;
    color: gray;
  }

  .HelperApp_btn {
    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      padding: 3px 11px;
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: ${(props) => props.theme.colors.pointGreen};
      transition: 0.2s;

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.pointGreen};
        color: #fff;
        background-color: ${(props) => props.theme.colors.pointGreen};
      }
    }
  }

  .HelperApp_container2 {
    font-size: 13px;
  }
`;
