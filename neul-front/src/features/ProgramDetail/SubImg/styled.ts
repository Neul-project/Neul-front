import styled from "styled-components";

export const SubImgStyled = styled.div`
  &.SubImg_main_wrap {
    display: flex;
    width: 100%;
    gap: 10px;
    margin-top: 10px;

    .SubImg_img {
      width: calc(100% / 3);
      height: 135px;
      object-fit: cover;

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

      .SubImg_img {
        width: calc(100% / 3);
        height: 130px;
        object-fit: cover;

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

      .SubImg_img {
        width: calc(100% / 3);
        height: 80px;
        object-fit: cover;

        .SubImg_imgstyle {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
