import styled from "styled-components";

export const TermsOfUseStyled = styled.div`
  width: 640px;
  margin: 0 auto;

  @media (max-width: 632px) {
    width: 100%;
  }

  .TermsOfUse_container {
    display: flex;
    padding: 10px 20px;

    @media (max-width: 632px) {
      display: block;
      padding: 0px;
    }
  }

  .TermsOfUse_title {
    width: 139px;
    padding-top: 12px;
    display: block;
    font-size: 15px;
    margin-bottom: 8px;
    color: #333;

    label {
      font-weight: 500;
      color: rgb(51, 51, 51);
      line-height: 20px;
    }
  }

  .TermsOfUse_agreements {
    width: 100%;
    padding-top: 12px;
  }

  .TermsOfUse_span {
    font-size: 14px;
    vertical-align: top;
    color: green;
  }

  .TermsOfUse_checkOne {
    margin-bottom: 10px;
  }

  .TermsOfUse_label {
    cursor: pointer;
    font-size: 14px;
  }

  .TermsOfUse_input {
    margin-right: 7px;
  }

  .TermsOfUse_FullAgreement {
    font-size: 18px;
    font-weight: 500;
  }

  .TermsOfUse_content {
    margin: 9px 0 0 21px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: #929294;
  }

  .TermsOfUse_nextBtn {
    display: flex;
    justify-content: center;

    button {
      cursor: pointer;
      width: 100%;
      height: 50px;
      font-size: 16px;
      font-weight: 700;
      border: none;
      border-radius: 3px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }

      &:disabled {
        cursor: default;
        background-color: #ccc;
      }
    }
  }

  .aaa {
    position: relative;
    width: 24px;
    height: 24px;
    border: 1.5px solid #bbb;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: green;

    i {
      position: absolute;
      top: 4px;
      color: #ccc;
    }
  }
`;
