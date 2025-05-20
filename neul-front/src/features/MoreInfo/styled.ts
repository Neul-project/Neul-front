import styled from "styled-components";

export const MoreInfoStyled = styled.div`
  hr {
    border: 0;
    height: 1px;
    background-color: rgb(51, 51, 51);
  }

  .MoreInfo_container {
    width: 640px;
    margin: 0 auto;

    @media (max-width: 632px) {
      width: 100%;
      padding: 0 20px;
    }
  }

  .MoreInfo_title {
    font-size: 23px;
    margin-top: 50px;
    margin-bottom: 50px;

    div {
      font-size: 28px;
      line-height: 35px;
      font-weight: 500;
      text-align: center;
      letter-spacing: -1px;
      color: #333;
    }

    p {
      font-size: 13px;
      color: #aaa;
      text-align: center;
    }
  }

  .MoreInfo_midTitle {
    padding-bottom: 10px;
    border-bottom: 2px solid rgb(51, 51, 51);
    font-size: 12px;
    color: rgb(102, 102, 102);
    line-height: 17px;
    text-align: right;
  }

  .MoreInfo_essential {
    color: rgb(238, 106, 123);
  }

  .MoreInfo_section {
    margin-bottom: 40px;
  }

  .MoreInfo_sectionTitle {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .MoreInfo_inputGroup {
    display: flex;
    padding: 10px 20px;

    @media (max-width: 632px) {
      display: block;
      padding: 0px;
    }

    &:focus {
      outline: 1px solid #333;
    }

    label {
      width: 139px;
      padding-top: 12px;
      display: block;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;

      @media (max-width: 632px) {
      }
    }
  }

  .MoreInfo_dup {
    button {
      cursor: pointer;
      padding: 11px 28px;
      margin-left: 8px;
      font-size: 15px;
      background-color: #fff;
      color: ${(props) => props.theme.colors.pointGreen};
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      border-radius: 4px;

      @media (max-width: 632px) {
        margin-left: 0px;
        margin-top: 10px;
      }
    }
  }

  .MoreInfo_input {
    width: 330px;
    height: 46px;
    padding: 0px 11px 1px 15px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: rgb(51, 51, 51);
    outline: none;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .MoreInfo_inputSmall {
    width: 80px;
    height: 40px;
    padding: 8px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
    margin-right: 8px;
    outline: none;
  }

  .MoreInfo_birthInput {
    display: flex;
    align-items: center;

    span {
      margin: 0 6px;
      font-size: 14px;
    }
  }

  .MoreInfo_birth {
    height: 44px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    padding: 0px 15px;

    span {
      font-size: 14px;
      color: rgb(204, 204, 204);
      text-align: center;
      line-height: 40px;
    }
  }

  .MoreInfo_radioGroup {
    display: flex;
    gap: 20px;

    label {
      font-size: 14px;
    }

    input {
      margin-right: 6px;
    }
  }

  .MoreInfo_address {
    display: flex;
    gap: 10px;

    .MoreInfo_input {
      flex: 1;
    }
  }

  .MoreInfo_addressBtn {
    margin-left: 8px;

    @media (max-width: 632px) {
      margin-left: 0px;
      margin-top: 10px;
    }

    button {
      width: 120px;
      height: 44px;
      padding: 10px 16px;
      background-color: #fff;
      color: ${(props) => props.theme.colors.pointGreen};
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      white-space: nowrap;
    }
  }

  .MoreInfo_textarea {
    width: 100%;
    resize: none;
    padding: 10px 11px 10px 15px;
    border-radius: 4px;
    border: 1px solid rgb(221, 221, 221);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: rgb(51, 51, 51);
    outline: none;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .MoreInfo_subBtn {
    text-align: center;
    margin-bottom: 40px;

    button {
      cursor: pointer;
      width: 26%;
      height: 56px;
      padding: 10px 16px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      white-space: nowrap;

      @media (max-width: 632px) {
        padding: 10px;
      }

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }

  .MoreInfo_error {
    font-size: 13px;
    color: rgb(240, 63, 64);
    margin-top: 4px;
  }
`;
