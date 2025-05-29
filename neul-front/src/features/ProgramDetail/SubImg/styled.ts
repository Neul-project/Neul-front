import styled from "styled-components";

export const SubImgStyled = styled.div`
  &.SubImg_main_wrap {
    display: flex;
    width: 100%;
    height: 120px;
    gap: 10px;
    margin-top: 10px;

    .SubImg_img {
      width: calc(100% / 3);
      object-fit: contain;

      .SubImg_imgstyle {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    &.SubImg_main_wrap {
      display: flex;
      width: 100%;
      gap: 10px;
      margin-top: 10px;
      height: 150px;

      .SubImg_img {
        width: calc(100% / 3);
        object-fit: contain;

        .SubImg_imgstyle {
          width: 100%;
          height: 100%;
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
      height: 90px;

      .SubImg_img {
        width: calc(100% / 3);
        object-fit: contain;

        .SubImg_imgstyle {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
