import styled from "styled-components";

export const AdvertisingStyled = styled.div`
  &.Advertising_main_wrap {
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
    width: 100%;
    height: 100%;

    .Advertising_title_text {
      font-size: 25px;
      color: #000;
      margin-bottom: 15px;
      //margin-left: 20px;
      margin-top: 60px;
    }
    .Advertising_adimg {
      display: flex;
      width: 100%;
      height: 250px;
      gap: 30px;
      margin-bottom: 20px;

      .Advertising_text {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 20px;
      }
    }
  }

  @media (max-width: 768px) {
    &.Advertising_main_wrap {
      display: flex;
      flex-direction: column;
      padding: 0px 40px;
      width: 100%;
      height: 100%;
      //gap: 20px;
      margin: 40px 0px;

      .Advertising_title_circle {
        position: relative;
        left: 100px;
        top: 65px;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: auto;
        height: auto;
        background: none;
        z-index: -10;

        li {
          display: block;
          width: 50px;
          height: 50px;
          margin: 0 -10px;
          background: #5da487;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
      }

      .Advertising_title_text {
        font-size: 20px;
        color: #fff;
        margin-top: 0px;
        margin-bottom: 35px;
        margin-left: 30px;
      }
      .Advertising_adimg {
        display: flex;
        width: 100%;
        height: 200px;
        gap: 30px;

        .Advertising_text {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.Advertising_main_wrap {
      display: flex;
      flex-direction: column;
      padding: 0px 40px;
      width: 100%;
      height: 100%;
      //gap: 20px;
      margin: 40px 0px;

      .Advertising_title_circle {
        position: relative;
        left: 70px;
        top: 50px;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: auto;
        height: auto;
        background: none;
        z-index: -10;

        li {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 -10px;
          background: #5da487;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
      }

      .Advertising_title_text {
        font-size: 15px;
        color: #fff;
        margin-top: 0px;
        margin-bottom: 25px;
        margin-left: 15px;
      }
      .Advertising_adimg {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 400px;
        gap: 10px;

        .Advertising_text {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          font-size: 20px;
        }
      }
    }
  }
`;
