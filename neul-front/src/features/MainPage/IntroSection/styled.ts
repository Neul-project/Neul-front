import styled, { keyframes } from "styled-components";
import { starStyle } from "@/utils/movestyled";

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

      transform: scale(1.4);

      .IntroSection_star {
        ${starStyle("36%", "27%", "50px")}
      }

      .IntroSection_bluestar {
        ${starStyle("70%", "46%", "25px")}
      }

      .IntroSection_heart {
        ${starStyle("74%", "27%", "35px")}
      }
      .IntroSection_pinkstar {
        ${starStyle("20%", "34%", "37px")}

        .IntroSection_imgstyle {
          transform: scaleX(-1);
        }
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

  @media (max-width: 768px) {
    &.IntroSection_main_wrap {
      max-width: 1280px;
      width: 100%;
      height: calc(100vh - 70px);
      display: flex;
      flex-direction: column;
      padding: 0px 20px;
      gap: 30px;

      .IntroSection_banner {
        width: 100%;
        height: 100%;

        background-image: url(${(props) => props.$bannerimg});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        transform: scale(1.3);

        .IntroSection_star {
          ${starStyle("36%", "27%", "50px")}
        }

        .IntroSection_bluestar {
          ${starStyle("70%", "46%", "25px")}
        }

        .IntroSection_heart {
          ${starStyle("74%", "27%", "35px")}
        }
        .IntroSection_pinkstar {
          ${starStyle("20%", "34%", "37px")}

          .IntroSection_imgstyle {
            transform: scaleX(-1);
          }
        }
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
