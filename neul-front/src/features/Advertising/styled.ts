import styled from "styled-components";

export const AdvertisingStyled = styled.div`
  &.Advertising_main_wrap {
    display: flex;
    padding: 0px 20px;
    width: 100%;
    height: 100%;
    gap: 20px;
    margin-top: 70px;

    .Advertising_text {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;

      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    &.Advertising_main_wrap {
      display: flex;
      //flex-direction: column;
      padding: 0px 20px;
      width: 100%;
      height: 100%;
      gap: 10px;
      margin-top: 70px;
    }
  }

  @media (max-width: 486px) {
    &.Advertising_main_wrap {
      display: flex;
      flex-direction: column;
      padding: 0px 20px;
      width: 100%;
      height: 100%;
      gap: 10px;
      margin-top: 70px;
    }
  }
`;
