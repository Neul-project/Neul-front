import styled, { keyframes } from "styled-components";

export const IntroSectionStyled = styled.div<{}>`
  &.IntroSection_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    gap: 70px;
    //text-align: center;
    justify-content: center;
    margin-top: 40px;

    .IntroSection_banner {
      width: 55%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .IntroSection_imgstyle {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .IntroSection_Navigation {
      width: 45%;
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
      gap: 70px;
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
          object-fit: cover;
        }
      }
      .IntroSection_Navigation {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
