import styled from "styled-components";

export const CircleStyled = styled.div<{
  $width: string;
  $top: string;
  $left: string;
  $titletop: string;
}>`
  &.Circle_title_background {
    position: relative;
    font-weight: 600;
    height: 50px;
    z-index: 1;
    margin-bottom: 15px;

    .Circle_title_circle {
      position: absolute;
      left: ${(props) => props.$left};
      top: ${(props) => props.$left};
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      width: auto;
      height: auto;
      background: none;

      li {
        display: block;
        width: ${(props) => props.$width};
        height: ${(props) => props.$width};
        margin: 0 -10px;
        background: #5da487;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
    }

    p {
      position: relative;
      top: ${(props) => props.$titletop};
      z-index: 2;
      color: white;
      margin: 12px 0px;
    }
  }

  @media (max-width: 768px) {
    &.Circle_title_background {
      position: relative;
      font-weight: 600;
      height: 50px;
      z-index: 1;
      margin-bottom: 15px;

      .Circle_title_circle {
        position: absolute;
        left: ${(props) => props.$left};
        top: ${(props) => props.$left};
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: auto;
        height: auto;
        background: none;

        li {
          display: block;
          width: ${(props) => props.$width};
          height: ${(props) => props.$width};
          margin: 0 -10px;
          background: #5da487;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
      }

      p {
        position: relative;
        top: ${(props) => props.$titletop};
        z-index: 2;
        color: white;
        margin: 12px 0px;
      }
    }
  }
`;
