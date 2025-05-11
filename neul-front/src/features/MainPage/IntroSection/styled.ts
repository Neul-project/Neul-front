import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0% {
    transform: rotate(-5deg);  

  }
  100% {
    transform: rotate(5deg);  visibility: visible;

  }
`;

export const IntroSectionStyled = styled.div<{
  $bannerimg: string;
}>`
  &.IntroSection_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    padding: 0px 20px;
    gap: 50px;

    .IntroSection_banner {
      width: 50%;
      height: 100%;

      background-image: url(${(props) => props.$bannerimg});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;

      .IntroSection_star {
        position: relative;
        left: 38%;
        top: 28%;
        width: 35px;

        opacity: 1;
        visibility: hidden;
        animation: ${wave} 1s ease-in-out infinite alternate;
        z-index: 1;
      }

      .IntroSection_bluestar {
        position: relative;
        left: 72%;
        top: 47%;
        width: 20px;

        opacity: 1;
        visibility: hidden;
        animation: ${wave} 1s ease-in-out infinite alternate;
        z-index: 1;
      }
      .IntroSection_imgstyle {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .IntroSection_Navigation {
      width: 50%;
      height: 100%;
    }
  }
`;
