import styled from "styled-components";

export const HeaderStyled = styled.div`
  &.Header_main_wrap {
    display: flex;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.07);
    /* position: relative; */
    z-index: 100;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: #fff;

    /* 스크롤에 따른 헤더 CSS 변경 */
    &.scrolled {
      height: 65px;
    }

    .header {
      max-width: 1280px;
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0px auto;

      .Header_logo_img {
        /* width: 100px; */
        height: 66%;
        cursor: pointer;
        padding-left: 20px;

        .Header_imgstyle {
          /* width: 100%; */
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

  .Header_user_container {
    cursor: pointer;
    position: relative;
    margin-right: 40px;
    font-size: 14px;
    line-height: 39px;

    .Header_icon {
      cursor: pointer;
      width: 8px;
      height: 5px;
      background-image: url("/ico_down.png");
      -webkit-background-size: cover;
      background-size: cover;
      -webkit-background-position: center;
      background-position: center;
      display: inline-block;
      margin-left: 5px;
      margin-bottom: 1px;
    }

    .Header_dropdown {
      position: absolute;
      top: 37px;
      right: 0;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      min-width: 120px;
      font-size: 12px;
      z-index: 999;
    }

    .Header_dropdown_item {
      padding: 0px 10px;
      cursor: pointer;
      white-space: nowrap;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }

  .Header_login_container {
    display: flex;
    align-items: center;
    margin-right: 40px;
    font-size: 14px;

    .color {
      cursor: pointer;
      color: ${(props) => props.theme.colors.pointGreen};

      &:hover {
        text-decoration: underline;
      }
    }

    .line {
      display: inline-block;
      width: 1px;
      height: 15px;
      margin: 0px 14px;
      background-color: rgb(217, 217, 217);
    }
  }

  .login {
    cursor: pointer;
  }
`;
