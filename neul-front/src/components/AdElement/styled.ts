import styled from "styled-components";

export const AdElementStyled = styled.div`
  &.AdElement_main_wrap {
    width: 50%;
    height: 300px;
    overflow: hidden;
    cursor: pointer;

    .AdElement_img {
      width: 100%;
      height: 100%;

      .AdElement_imgstyle {
        width: 100%;
        height: 100%;
        //border: 1px solid black;
        object-fit: contain;
        border-radius: 15px;
      }
    }
  }

  @media (max-width: 486px) {
    &.AdElement_main_wrap {
      width: 100%;
      height: 150px;
      overflow: hidden;
      cursor: pointer;

      .AdElement_img {
        width: 100%;
        height: 100%;

        .AdElement_imgstyle {
          width: 100%;
          height: 100%;
          //border: 1px solid black;
          object-fit: contain;
          border-radius: 15px;
        }
      }
    }
  }
`;
