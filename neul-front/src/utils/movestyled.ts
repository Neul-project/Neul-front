import { css, keyframes } from "styled-components";

export const wave = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  100% {
    transform: translateY(-5px) rotate(5deg);
  }
`;

export const starStyle = (left: string, top: string, width: string) => css`
  position: relative;
  left: ${left};
  top: ${top};
  width: ${width};
  opacity: 1;
  visibility: visible;
  animation: ${wave} 1s ease-in-out infinite alternate;
  z-index: 1;
`;
