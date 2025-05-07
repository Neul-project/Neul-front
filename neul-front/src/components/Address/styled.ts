import styled from "styled-components";

export const AddressStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .Address_container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    line-height: 48px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 90vh;
    overflow-y: auto;
  }

  .Address_close {
    position: absolute;
    z-index: 1;
    top: 34%;
    right: 33%;
    width: 32px;
    height: 32px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    color: #333;
    font-weight: bold;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .Address_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;

    label {
      font-size: 19px;
      font-weight: 700;
    }
  }

  .Address_inputWrap {
    width: 100%;
  }

  .Address_flex {
    display: flex;
    justify-content: space-between;
  }

  .Address_width {
    width: 75%;
  }

  .Address_input {
    width: 100%;
    padding: 9px 9px;
    border-radius: 6px;
    border: 1px solid gray;
  }

  .Address_search {
    button {
      padding: 6px 10px;
      background-color: #fff;
      color: ${(props) => props.theme.colors.pointGreen};
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .margin {
    margin-top: 13px;
  }

  .Address_submit {
    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      border: none;
      padding: 9px 18px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }
`;
