import styled from "styled-components";

export const TermsOfUseStyled = styled.div`
  width: 500px;
  margin: 0 auto;

  .TermsOfUse_title {
    margin-bottom: 10px;
  }

  .TermsOfUse_checkOne {
    margin-bottom: 10px;
  }

  .TermsOfUse_label {
    cursor: pointer;
  }

  .TermsOfUse_FullAgreement {
    font-size: 18px;
    font-weight: 700;
  }

  .TermsOfUse_content {
    margin: 9px 0 0 32px;
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
        background-color: #bbb;
      }
    }
  }
`;
