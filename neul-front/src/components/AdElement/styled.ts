import styled from "styled-components";

export const AdElementStyled = styled.div`
  &.AdElement_main_wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    //border: 1px solid black;
    border-radius: 15px;

    .AdElement_img {
      width: 100%;
      height: 300px;
      cursor: pointer;

      .AdElement_imgstyle {
        width: 100%;
        height: 83%;
        /* object-fit: cover; */
        border-radius: 15px;
      }
    }
  }

  @media (max-width: 768px) {
    &.AdElement_main_wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      //border: 1px solid black;
      border-radius: 15px;

      .AdElement_img {
        width: 100%;
        height: 300px;
        cursor: pointer;

        .AdElement_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.AdElement_main_wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      //border: 1px solid black;
      border-radius: 15px;

      .AdElement_img {
        width: 100%;
        height: 200px;
        cursor: pointer;

        .AdElement_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }
      }
    }
  }
`;
