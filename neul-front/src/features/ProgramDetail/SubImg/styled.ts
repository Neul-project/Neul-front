import styled from "styled-components";

export const SubImgStyled = styled.div`
  &.SubImg_main_wrap {
    display: flex;
    width: 100%;
    margin-top: 15px;
    text-align: center;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .SubImg_img {
      .SubImg_imgstyle {
        width: 100px;
        height: 100px;
        object-fit: contain;
      }
    }
  }

  @media (max-width: 768px) {
    &.SubImg_main_wrap {
      display: flex;
      width: 100%;
      margin-top: 10px;
      justify-content: center;
      .SubImg_img {
        .SubImg_imgstyle {
          width: 90px;
          height: 90px;
          object-fit: contain;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.SubImg_main_wrap {
      display: flex;
      width: 100%;
      margin-top: 10px;

      .SubImg_img {
        .SubImg_imgstyle {
          width: 90px;
          height: 90px;
          object-fit: contain;
        }
      }
    }
  }
`;
