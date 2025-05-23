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
    position: relative;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);
    line-height: 31px;
  }

  .info {
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: #c9c9c9;
  }

  .custom_modal_container {
    position: absolute;
    z-index: 1;
    left: -11px;
    top: 21px;
    width: 240px;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 20px;
    line-height: 20px;
    color: #333;
    font-weight: 400;

    @media (max-width: 785px) {
      left: -100px;
    }
  }

  .mainColor {
    color: ${(props) => props.theme.colors.pointGreen};
  }

  .HelperApp_Content {
    margin-top: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
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
