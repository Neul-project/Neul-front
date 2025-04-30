import styled from "styled-components";

export const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 100px;
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

  .Login_easy_container {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 14px;
    margin: 20px 0 17px 0;
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
      height: 42px;
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
      height: 17px;
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
    justify-content: center;
    gap: 20px;
  }

  .Login_naver,
  .Login_kakao {
    cursor: pointer;

    img {
      width: 48px;
    }
  }
`;
