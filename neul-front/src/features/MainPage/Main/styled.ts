import styled from "styled-components";

export const MainPageSide = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fef6d4;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 0px 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fef6d4;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 0px 10px;
  }
  @media (max-width: 486px) {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #fef6d4;
    font-size: 14px;
    font-weight: bold;
    padding: 0px 10px;
  }
`;

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
  }
`;
