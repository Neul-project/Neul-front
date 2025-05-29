import styled from "styled-components";

export const AdElementStyled = styled.div`
  &.AdElement_main_wrap {
    width: 100%;
    overflow: hidden;
    border-radius: 15px;

    .AdElement_img {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      cursor: pointer;
      border-radius: 15px;
      overflow: hidden;

      @media (max-width: 884px) {
        padding-top: 56.25%;
      }

      .AdElement_imgstyle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
      }
    }
  }
`;
