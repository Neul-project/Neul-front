import styled from "styled-components";

export const SideBarMenuStyled = styled.div`
  height: 100vh;
  position: relative;
  background-color: #fff;
  padding: 20px 39px;
  box-shadow: 5px 1px 8px 0 rgba(0, 0, 0, 0.06);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  vertical-align: top;
  z-index: 1;

  .SideBar_wrap {
    border-bottom: 1px solid rgba(146, 146, 148, 0.3);

    .SideBarMenu_item {
      cursor: pointer;
      position: relative;
      color: #1e1e23;
      margin-top: 30px;

      &:last-child {
        margin-bottom: 30px;
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
