import styled from "styled-components";

export const SubImgStyled = styled.div`
  &.SubImg_main_wrap {
    display: flex;
    width: 100%;
    gap: 10px;
    margin-top: 10px;

    .SubImg_img {
      width: calc(100% / 3);
      //border: 1px solid black;

      .SubImg_imgstyle {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
