import styled from "styled-components";

export const NavigationElementStyled = styled.div`
  &.NavigationElement_main_wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 15px;
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
        margin: 12px 0px;
      }

      .NavigationElement_title_circle {
        position: absolute;
        left: 50%; /* 중앙 기준점 */
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        width: auto;
        height: auto;
        background: none;

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
    }
    .NavigationElement_row1,
    .NavigationElement_row2 {
      display: flex;
      width: 100%;
      gap: 15px;
    }

    .NavigationElement_ele {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 120px;
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
        width: 50px;
      }
      .NavigationElement_imgstyle {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media (max-width: 1024px) {
    &.NavigationElement_main_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      gap: 15px;
      place-items: center;
      padding: 0px 15px;

      .NavigationElement_row1,
      .NavigationElement_row2 {
        display: flex;
        width: 100%;
        gap: 15px;
      }

      .NavigationElement_ele {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 120px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-8px);
        }

        .NavigationElement_img {
          width: 50px;
        }
        .NavigationElement_imgstyle {
          width: 100%;
          height: 100%;
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
      gap: 10px;
      place-items: center;
      padding: 0px 10px;

      .NavigationElement_row1,
      .NavigationElement_row2 {
        display: flex;
        width: 100%;
        gap: 10px;
      }

      .NavigationElement_ele {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-8px);
        }

        .NavigationElement_img {
          width: 40px;
        }
        .NavigationElement_imgstyle {
          width: 100%;
          height: 100%;
        }

        .NavigationElement_text {
          font-size: 11px;
        }
      }
    }
  }
`;
