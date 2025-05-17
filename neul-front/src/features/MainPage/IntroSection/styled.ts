import styled, { keyframes } from "styled-components";

export const IntroSectionStyled = styled.div<{}>`
  &.IntroSection_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    gap: 20px;
    //text-align: center;
    justify-content: center;
    margin-top: 40px;

    .IntroSection_banner {
      width: 62%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .IntroSection_imgstyle {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .IntroSection_Navigation {
      width: 38%;
      height: 100%;
    }
  }

  @media (max-width: 768px) {
    &.IntroSection_main_wrap {
      max-width: 1280px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column-reverse;
      padding: 0px 20px;
      gap: 40px;
      justify-content: center;
      margin-top: 0px;

      .IntroSection_banner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .IntroSection_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .IntroSection_Navigation {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
