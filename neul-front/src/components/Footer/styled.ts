import styled from "styled-components";

export const FooterStyled = styled.div`
  &.Footer_main_wrap {
    border-top: 1px solid #ccc;
    .footer {
      max-width: 1280px;
      width: 100%;
      height: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 5px auto;
      gap: 5px;

      .Footer_text {
        font-size: 13px;
      }
    }

    .footerOff {
      display: none;
    }
  }

  @media (max-width: 486px) {
    &.Footer_main_wrap {
      border-top: 1px solid #ccc;
      .footer {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px auto;
        margin-top: 20px;

        .Footer_text {
          font-size: 10px;
        }
      }

      .footerOff {
        display: none;
      }
    }
  }
`;
