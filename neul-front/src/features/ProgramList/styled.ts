import styled from "styled-components";

export const ProgramBackground = styled.div<{ $backimg: string }>`
  background-image: url(${(props) => props.$backimg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
`;

export const ProgramListStyled = styled.div`
  &.ProgramList_main_wrap {
    max-width: 1280px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0px auto;
    padding: 0px 20px;

    .ProgramList_title {
      padding-top: 50px;
      align-items: center;
      text-align: center;
      font-size: 25px;
      margin-bottom: 60px;
    }

    .my-masonry-grid {
      display: flex;
      margin-left: -30px;
      width: auto;
    }
    .my-masonry-grid_column {
      padding-left: 30px;
      background-clip: padding-box;
    }

    .my-masonry-grid_column > div {
    }
  }
`;
