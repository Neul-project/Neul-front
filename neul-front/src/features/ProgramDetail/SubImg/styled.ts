import styled from "styled-components";

export const SubImgStyled = styled.div`
  &.SubImg_main_wrap {
    display: flex;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
    text-align: center;
    align-items: center;
    justify-content: center;

    .SubImg_img {
      display: flex;
      width: 30%;
      height: 120px;

      .SubImg_imgstyle {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  @media (max-width: 768px) {
    &.SubImg_main_wrap {
      display: flex;
      width: 100%;
      gap: 10px;
      margin-top: 10px;
      height: 110px;

      .SubImg_img {
        width: 30%;
        height: 100%;

        .SubImg_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.SubImg_main_wrap {
      display: flex;
      width: 100%;
      gap: 10px;
      margin-top: 10px;
      height: 110px;

      .SubImg_img {
        width: 30%;
        height: 100%;

        .SubImg_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
  }
`;
