import styled from "styled-components";

export const JoinStyled = styled.div`
  .Join_logoWrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 10px;

    @media (max-width: 506px) {
      margin-top: 65px;
    }
  }

  .Join_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Join_firstInputWrap {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 2px solid #cfcfcf;
    border-radius: 10px;
  }

  .Join_secondInputWrap {
    margin-bottom: 10px;
    border: 2px solid #cfcfcf;
    border-radius: 10px;
  }

  .Join_inputWrap {
    width: 460px;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    min-height: 50px;
    padding: 0 10px 0 45px;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: inherit;
      border: 1px solid #c6c6c6;
      pointer-events: none;
      content: "";
    }

    @media (max-width: 506px) {
      width: 320px;
    }
  }

  .Join_input {
    cursor: pointer;
    flex: 1 1 auto;
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    line-height: 22px;
    color: #222;
    caret-color: #222;
    border: none;
    outline: 0;
  }

  .Join_email,
  .Join_name {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .Join_passCheck,
  .Join_phone {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .Join_email,
  .Join_password,
  .Join_passCheck,
  .Join_name,
  .Join_wardName,
  .Join_phone {
    &::before {
      background-image: url(/naver_icon.png);
      background-size: 372px 326px;
      background-repeat: no-repeat;
      position: absolute;
      top: 10px;
      left: 9px;
      content: "";
    }
  }

  .Join_email,
  .Join_name,
  .Join_wardName {
    &::before {
      background-position: -342px -64px;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
    }
  }

  .Join_password,
  .Join_passCheck {
    &::before {
      background-position: -310px 0;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
    }
  }

  .Join_phone {
    &::before {
      background-position: -224px -296px;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
    }
  }

  .Join_selectBox {
    width: 460px;
    max-width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 506px) {
      width: 320px;
    }
  }

  .Join_submit_btn {
    width: 460px;
    margin-top: 1.5rem;
    margin-bottom: 65px;

    @media (max-width: 506px) {
      width: 320px;
    }

    button {
      cursor: pointer;
      width: 100%;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 14px 0;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }

  .ant-select-selector {
    border: 2px solid #cfcfcf !important;

    &:focus-within {
      box-shadow: 0 0 4px 2px #d0ede1 !important;
    }
  }

  .Join_validation {
    position: relative;
    padding-left: 8px;
    width: 460px;
    color: red;
    font-size: 14px;
    margin-bottom: 10px;

    &::before {
      position: absolute;
      top: 9px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: red;
      content: "";
    }

    @media (max-width: 506px) {
      width: 320px;
    }
  }

  .Join_duplication {
    cursor: pointer;
    background-color: #79b79d;
    border: none;
    border-radius: 4px;
    padding: 6px 10px;
    width: 26%;
    font-weight: 700;
    color: #fff;
  }
`;
