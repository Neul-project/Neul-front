import styled from "styled-components";

export const SideBarMenuStyled = styled.div`
  width: 375px;
  height: 100vh;
  position: relative;
  background-color: #fff;
  padding: 20px 39px;
  border: none;
  border-radius: 16px;

  @media (max-width: 632px) {
    width: 100%;
    height: auto;
    margin-bottom: 18px;
    padding: 14px 29px;
    font-size: 14px;
  }

  @media (max-width: 534px) {
    padding: 14px 17px;
  }

  .SideBar_wrap {
    border-bottom: 1px solid rgb(238, 238, 238);

    @media (max-width: 632px) {
      display: flex;
      justify-content: space-between;
      border-bottom: none;
    }

    .SideBarMenu_item {
      cursor: pointer;
      position: relative;
      color: #1e1e23;
      margin-top: 30px;

      @media (max-width: 632px) {
        margin-top: 0px;
      }

      @media (max-width: 427px) {
        font-size: 10px;
      }

      &:last-child {
        margin-bottom: 30px;

        @media (max-width: 632px) {
          margin-bottom: 2px;
        }
      }
    }

    .active {
      color: ${(props) => props.theme.colors.pointGreen};
      font-weight: 700;
      display: inline-block;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -5px;
        width: 100%;
        height: 2px;
        background-color: ${(props) => props.theme.colors.pointGreen};
        border-radius: 1px;
      }
    }
  }

  .SideBarMenu_logout {
    padding-top: 30px;
    text-align: center;

    @media (max-width: 632px) {
      display: none;
    }

    button {
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-size: 13px;
      line-height: 16px;
      letter-spacing: -0.46px;
      color: #8c8c8c;
    }
  }
`;
