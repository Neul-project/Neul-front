import styled from "styled-components";

export const MainPageBackground = styled.div<{ $backimg: string }>`
  background-image: url(${(props) => props.$backimg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
`;

export const MainPageStyled = styled.div`
  &.MainPage_main_wrap {
    max-width: 1280px;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px auto;

    /* background-color: #edeff2; */
  }
`;
