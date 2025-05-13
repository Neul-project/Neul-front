import styled from "styled-components";

export const FooterStyled = styled.div`
  &.Footer_main_wrap {
    //border-top: 1px solid #ccc;
    background-color: #fff;
    .footer {
      max-width: 1280px;
      width: 100%;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0px auto;
      gap: 10px;
      padding: 10px 40px;
      border-top: 1px solid rgb(247, 247, 247);

      .Footer_text {
        font-size: 13px;
        color: gray;
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
