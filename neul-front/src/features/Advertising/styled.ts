import styled from "styled-components";

export const AdvertisingStyled = styled.div`
  &.Advertising_main_wrap {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    width: 100%;
    height: 100%;

    .Advertising_title_text {
      font-size: 24px;
      color: #333;
      margin-bottom: 15px;
      margin-top: 70px;
      letter-spacing: -1.5px;
    }
    .Advertising_adimg {
      display: flex;
      width: 100%;
      gap: 20px;
      margin-bottom: 20px;

      .Advertising_empty {
        width: 100%;
        margin: 50px auto 10px auto;

        .empty_img {
          display: flex;
          justify-content: center;

          .empty_img {
            width: 70px;
            height: 70px;
          }
        }
      }
      .Advertising_text {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        font-size: 14px;
      }
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
  }
`;
