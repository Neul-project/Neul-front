import styled from "styled-components";

export const NavigationElementStyled = styled.div`
  &.NavigationElement_main_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: center;

    .NavigationElement_backimg {
      width: 87%;
      display: flex;
      margin: 0px auto;

      .NavigationElement_imgstyle {
        width: 100%;
        height: 100%;
      }
    }

    .NavigationElement_chat_num .ant-scroll-number {
      min-width: 18px;
      height: 18px;
      line-height: 18px;
      border-radius: 50% !important;
      padding: 0;
      text-align: center;
      display: inline-block;
    }

    .NavigationElement_title {
      font-size: 24px;
      color: #333;
      font-weight: bold;
      margin-bottom: 15px;
      letter-spacing: -1.5px;
    }
    .NavigationElement_rows {
      /* width: 472px; */
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .NavigationElement_row1,
    .NavigationElement_row2 {
      display: flex;
      width: 100%;
      gap: 30px;
    }

    .NavigationElement_ele {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 125px;
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
        width: 53px;
        margin-bottom: 5px;
      }
      .NavigationElement_imgstyle {
        width: 100%;
        height: 100%;
      }

      .NavigationElement_text {
        font-size: 16px;
      }
    }

    .NavigationElement_newsDiv {
      /* height: 300px; */
    }

    .NavigationElement_newsImg {
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 1200px) {
    .NavigationElement_title {
      margin-top: 20px;
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

      .NavigationElement_title {
        font-size: 23px;
        color: #333;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: left;
        align-self: flex-start;
      }

      .NavigationElement_rows {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
      }

      .NavigationElement_row1,
      .NavigationElement_row2 {
        display: flex;
        width: 100%;
        gap: 20px;
        justify-content: center;
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
      text-align: left;
      justify-content: center;
      //gap: 15px;
      //place-items: center;
      //padding: 0px 15px;

      .NavigationElement_title {
        font-size: 19px;
        color: #333;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .NavigationElement_rows {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .NavigationElement_row1,
      .NavigationElement_row2 {
        display: flex;
        width: 100%;
        gap: 8px;
      }

      .NavigationElement_ele {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80px;
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
          width: 35px;
          margin-bottom: 5px;
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

  .NavigationElement_container2 {
    margin-top: 41px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
