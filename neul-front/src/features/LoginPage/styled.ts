import styled from "styled-components";

export const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 60px;
  color: rgb(136, 136, 136);

  li {
    list-style: none;
  }

  .Login_container {
    width: 400px;
    padding: 20px;
    border: 1px solid #bdbdbd;
    border-radius: 8px;

    @media (max-width: 632px) {
      border: none;
    }
  }

  .Login_logoCont {
    cursor: pointer;
    width: 130px;
    margin: 0 auto;
    margin-bottom: 23px;

    img {
      width: 100%;
    }
  }

  .Login_socialContainer {
    position: relative;
  }

  .Login_easy_container {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 14px;
    margin: 26px 0 17px 0;
  }

  .Login_inputWrap {
    input {
      width: 100%;
      padding: 12px 14px;
      border: 1px solid #bdbdbd;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 14px;

      &:focus {
        outline: 2px solid #fef6d4;
      }
    }
  }

  .Login_validation {
    position: relative;
    padding-left: 8px;
    color: red;
    font-size: 13px;

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
  }

  .Login_btn {
    button {
      cursor: pointer;
      width: 100%;
      height: 47px;
      margin-top: 10px;
      border: none;
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      font-weight: 700;
      font-size: 16px;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }

  .Login_middle {
    position: relative;
    left: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 12px;
    margin-top: 10px;

    li {
      padding: 0 14px;
    }

    span {
      height: 15px;
      border: 1px solid #ddd;
    }
  }

  .Login_easyLogin_title {
    padding: 0px 12px;
    white-space: nowrap;
    font-size: 13px;
  }

  .Login_easy_span {
    flex: 1 1 0%;
    height: 1.5px;
    background-color: rgb(204, 204, 204);
  }

  .Login_socialLogin {
    display: flex;
    position: relative;
    justify-content: center;
    gap: 20px;
  }

  .Login_socialWrapper:hover .speech {
    display: block;
  }

  .Login_naver,
  .Login_kakao {
    cursor: pointer;

    img {
      width: 48px;
    }
  }

  .Login_guide {
    display: none;
    margin-top: 12px;
    font-size: 12px;

    @media (max-width: 632px) {
      display: block;
    }

    li {
      position: relative;
      padding-left: 8px;

      &::before {
        position: absolute;
        top: 9px;
        left: 0;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgb(136, 136, 136);
        content: "";
      }
    }

    span {
      color: ${(props) => props.theme.colors.pointGreen};
      font-weight: 700;
    }
  }

  .hover {
    &:hover {
    }
  }
`;

export const SpeechBubble = styled.div`
  display: none;
  position: absolute;
  top: -57px;
  left: 75px;
  background: #fff;
  border-radius: 10px;
  border: 1.5px solid rgb(221, 221, 221);
  padding: 8px 10px;
  font-size: 11px;
  font-weight: 700;
  color: gray;
  width: fit-content;
  max-width: 300px;
  line-height: 1.5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: 0.2s;

  /* &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px;
    border-style: solid;
    border-color: rgb(221, 221, 221) transparent transparent transparent;
    z-index: 0;
  } */

  span {
    color: ${(props) => props.theme.colors.pointGreen};
  }

  p {
    font-size: 11px;
    text-align: center;
    line-height: 12px;
  }
`;
