import styled from "styled-components";

export const IntroSectionStyled = styled.div`
  &.IntroSection_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0px 20px;
    gap: 50px;
    margin-top: 30px;

    .IntroSection_banner {
      width: 60%;
    }
    .IntroSection_Navigation {
      width: 40%;
    }
  }

  @media (max-width: 1024px) {
    &.IntroSection_main_wrap {
      max-width: 1280px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column-reverse;
      padding: 0px 20px;
      gap: 50px;
      margin-top: 30px;

      .IntroSection_banner {
        width: 100%;
      }
      .IntroSection_Navigation {
        width: 100%;
      }
    }
  }
`;
