import styled from "styled-components";

export const ActivityContentStyled = styled.div`
  &.ActivityContent_main_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin: 0px auto;

    .title {
      display: flex;
      gap: 10px;
    }

    .ActivityContent_swiper {
      width: 100%;
      height: 500px;

      .ActivityContent_swperimg {
        width: 100%;
        height: 100%;
      }
    }

    .ActivityContent_type {
      display: flex;
      width: 100%;
    }
  }
`;
