import styled from "styled-components";

export const SideBarMenuStyled = styled.div`
  width: 290px;
  height: 100vh;
  position: relative;
  background-color: #fff;
  padding: 20px 39px;
  border-right: 1.5px solid #ddd;

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
