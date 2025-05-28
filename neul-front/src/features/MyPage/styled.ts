import styled from "styled-components";

export const MyPageStyled = styled.div`
  background-color: rgb(242, 245, 248);

  .MyPage_container {
    display: flex;
    gap: 24px;
    max-width: 1050px;
    margin: 0 auto;
    padding: 50px 0 80px;

    @media (max-width: 632px) {
      display: block;
      padding: 18px 0 80px;
      height: 100vh;
    }
  }

  .MyPage_leftContainer {
    @media (max-width: 632px) {
      padding: 0 20px;
    }
  }

  .MyPage_rightContainer {
    width: 100%;
  }
`;
