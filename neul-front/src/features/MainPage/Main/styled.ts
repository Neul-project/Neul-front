import styled from "styled-components";

export const MainPageStyled = styled.div`
  &.MainPage_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 155px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;

    .MainPage_side {
      width: 100%;
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fef6d4;
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
