import styled from "styled-components";

export const NavigationElementStyled = styled.div`
  &.NavigationElement_main_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;
    //gap: 15px;
    //place-items: center;
    //padding: 0px 15px;

    .NavigationElement_title {
      font-size: 25px;
      color: #000;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .NavigationElement_rows {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .NavigationElement_row1,
    .NavigationElement_row2 {
      display: flex;
      width: 100%;
      gap: 20px;
    }

    .NavigationElement_ele {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 110px;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      box-shadow: 0 0 20px -9px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      transition: transform 0.2s ease;
      background-color: white;

      &:hover {
        transform: translateY(-8px);
      }

      .NavigationElement_img {
        width: 47px;
        margin-bottom: 5px;
      }
      .NavigationElement_imgstyle {
        width: 100%;
        height: 100%;
      }

      .NavigationElement_text {
        font-size: 15px;
      }
    }
  }

  @media (max-width: 768px) {
    &.NavigationElement_main_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      margin-top: 20px;
      gap: 5px;
      place-items: center;
      padding: 0px 15px;

      .NavigationElement_title_background {
        position: relative;
        font-weight: 600;
        height: 50px;
        z-index: 1;
        margin-bottom: 15px;

        p {
          position: relative;
          z-index: 2;
          color: white;
          margin: 10px 0px;
          font-size: 16px;
        }

        .NavigationElement_title_circle {
          position: absolute;
          left: 50%;
          top: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          width: auto;
          height: auto;
          background: none;

          li {
            display: block;
            width: 45px;
            height: 45px;
            margin: 0 -10px;
            background: #5da487;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
        }
      }

      .NavigationElement_rows {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 15px;
      }

      .NavigationElement_row1 {
        display: flex;
        width: 60%;
        gap: 15px;
        justify-content: right;
      }
      .NavigationElement_row2 {
        display: flex;
        width: 40%;
        gap: 15px;
        justify-content: left;
      }

      .NavigationElement_ele {
        display: flex;
        flex-direction: column;
        width: 100px;
        height: 100px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 0 20px -9px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
        background-color: white;

        &:hover {
          transform: translateY(-8px);
        }

        .NavigationElement_img {
          width: 45px;
        }
        .NavigationElement_imgstyle {
          width: 100%;
          height: 100%;
        }
        .NavigationElement_text {
          font-size: 13px;
        }
      }
    }
  }

  @media (max-width: 486px) {
    &.NavigationElement_main_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      margin-top: 20px;
      gap: 5px;
      place-items: center;
      padding: 0px 15px;

      .NavigationElement_title_background {
        position: relative;
        font-weight: 600;
        height: 50px;
        z-index: 1;
        margin-bottom: 0px;

        p {
          position: relative;
          z-index: 2;
          color: white;
          margin: 10px 0px;
          font-size: 13px;
        }

        .NavigationElement_title_circle {
          position: absolute;
          left: 50%;
          top: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          width: auto;
          height: auto;
          background: none;

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
      }

      .NavigationElement_rows {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 15px;
      }

      .NavigationElement_row1 {
        display: flex;
        width: 100%;
        gap: 15px;
        justify-content: center;
      }
      .NavigationElement_row2 {
        display: flex;
        width: 100%;
        gap: 15px;
        justify-content: center;
      }

      .NavigationElement_ele {
        display: flex;
        flex-direction: column;
        width: 100px;
        height: 100px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 0 20px -9px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: transform 0.2s ease;
        background-color: white;

        &:hover {
          transform: translateY(-8px);
        }

        .NavigationElement_img {
          width: 45px;
        }
        .NavigationElement_imgstyle {
          width: 100%;
          height: 100%;
        }
        .NavigationElement_text {
          font-size: 13px;
        }
      }
    }
  }
`;
