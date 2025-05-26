import styled from "styled-components";

export const ActivityListStyled = styled.div`
  &.ActivityList_main_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
    padding: 0px 20px;

    .ActivityList_title {
      padding: 50px 10px 7px 10px;
      font-size: 24px;
      color: #333;
      font-weight: bold;
      margin-bottom: 20px;
      display: inline-block;
      //border-bottom: 2px solid rgb(242, 245, 248);
      text-align: left;
      //align-items: left;
    }
  }

  @media (max-width: 768px) {
    &.ActivityList_main_wrap {
      max-width: 1280px;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      margin: 0px auto;
      padding: 0px 20px;

      .ActivityList_title {
        padding: 30px 10px 0px 10px;
        font-size: 20px;
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
        display: inline-block;
        //border-bottom: 2px solid rgb(242, 245, 248);
        text-align: left;
        //align-items: left;
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
      margin: 0px auto;
      padding: 0px 20px;

      .ActivityList_title {
        padding: 20px 10px 0px 10px;
        font-size: 17px;
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
        display: inline-block;
        //border-bottom: 2px solid rgb(242, 245, 248);
        text-align: left;
        //align-items: left;
      }
    }
  }
`;
