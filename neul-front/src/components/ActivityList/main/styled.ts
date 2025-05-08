import styled from "styled-components";

export const ActivityListStyled = styled.div`
  &.ActivityList_main_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    //align-items: center;
    margin: 0px auto;
    padding: 0px 20px;
    background-color: #edeff2;

    .ActivityList_h1 {
      padding-top: 20px;
      align-items: center;
      text-align: center;
      //font-weight: 800;
      font-size: 30px;
      margin-bottom: 40px;
    }
  }
  @media (max-width: 768px) {
    &.ActivityList_main_wrap {
      max-width: 1280px;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      //align-items: center;
      margin: 0px auto;
      padding: 0px 20px;

      .ActivityList_h1 {
        padding-top: 20px;
        align-items: center;
        text-align: center;
        //font-weight: 800;
        font-size: 25px;
        margin-bottom: 20px;
      }
    }
  }

  @media (max-width: 486px) {
    &.ActivityList_main_wrap {
      max-width: 1280px;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      //align-items: center;
      margin: 0px auto;
      padding: 0px 20px;

      .ActivityList_h1 {
        padding-top: 20px;
        align-items: center;
        text-align: center;
        //font-weight: 800;
        font-size: 20px;
        margin-bottom: 14px;
      }
    }
  }
`;
