import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.Header_main_wrap {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;

    .header {
      max-width: 1280px;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px auto;

      .Header_logo_img {
        width: 100px;
        height: 100%;
        cursor: pointer;

        .Header_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .Header_menu {
        width: 30px;
        height: 50%;
        cursor: pointer;

        .Header_imgstyle {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .headerOff {
      display: none;
    }
  }
`;
