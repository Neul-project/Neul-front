import styled from "styled-components";

export const FindPwStyled = styled.div`
  height: 90vh;
  background-color: ${(props) => props.theme.colors.backColor};

  @media (max-width: 632px) {
    height: 100vh;
  }

  .FindId_container {
    width: 375px;
    margin: 0 auto;
    text-align: center;

    @media (max-width: 632px) {
      width: 100%;
      padding: 20px;
    }
  }

  .FindId_ResultContainer {
    .guide1 {
      /* margin-bottom: 15px; */
    }

    .guide2 {
      color: #aaa;
      font-size: 13px;
      margin-bottom: 35px;
    }

    .FindId_No_container {
      display: flex;
      gap: 10px;
    }

    .FindId_ResultEmail {
      width: 100%;
      padding: 10px 9px;
      border-radius: 6px;
      border: 1px solid #ccc;
      background-color: #fcfcfc;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .FindId_ResultBtn {
      cursor: pointer;
      width: 100%;
      height: 46px;
      margin-top: 10px;
      border: none;
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      font-size: 16px;
    }

    .FindId_homeBtn {
      cursor: pointer;
      width: 100%;
      height: 46px;
      margin-top: 10px;
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      border-radius: 8px;
      background-color: #fff;
      color: ${(props) => props.theme.colors.pointGreen};
      font-size: 16px;
    }
  }

  .FindId_homeBtn {
  }

  .FindId_InputContainer {
    width: 375px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .input_subContainer {
    margin-bottom: 15px;
  }

  .FindId_title {
    padding: 50px 0 30px;
    font-size: 26px;
    font-weight: 500;
  }

  .FindId_name {
    font-size: 14px;
    margin-bottom: 5px;
    text-align: start;
  }

  .FindId_input {
    width: 100%;
    padding: 9px 9px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  .FindPw_inputCont {
    display: flex;
    gap: 5px;
  }

  .FindPw_inputBtn {
    width: 35%;
    display: inline-flex;

    @media (max-width: 415px) {
      width: 42%;
    }

    button {
      cursor: pointer;
      width: 100%;
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      padding: 0 4px;
      border-radius: 4px;
      background-color: #fff;
      color: ${(props) => props.theme.colors.pointGreen};
      font-size: 13px;
      font-weight: 500;
      transition: 0.2s;

      &:hover {
        border: 1px solid #fff;
        background-color: ${(props) => props.theme.colors.pointGreen};
        color: #fff;
      }
    }
  }

  .FindId_sub {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      height: 42px;
      margin-top: 10px;
      border: 1px solid #fff;
      border-radius: 8px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      transition: 0.2s;

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.pointGreen};
        background-color: #fff;
        color: ${(props) => props.theme.colors.pointGreen};
      }
    }
  }

  span {
    color: rgb(238, 106, 123);
  }

  .error {
    font-size: 13px;
    color: rgb(238, 106, 123);
    text-align: start;
  }
`;
