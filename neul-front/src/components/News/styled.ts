import styled from "styled-components";

export const NewsStyled = styled.div`
  font-family: "Pretendard", sans-serif;

  .NavigationElement_title2 {
    position: relative;
    display: flex;
    gap: 25px;
    margin-bottom: 23px;
    font-size: 22px;
    color: #111;

    @media (max-width: 768px) {
      font-size: 21px;
      margin-bottom: 11px;
    }

    button {
      position: relative;
      background: none;
      border: none;
      font-size: 22px;
      font-weight: 600;
      color: #333;
      cursor: pointer;
      transition: 0.2s;

      @media (max-width: 768px) {
        font-size: 21px;
      }

      @media (max-width: 486px) {
        font-size: 19px;
      }

      &:hover {
        text-decoration: underline;
      }

      &:focus {
        text-decoration: none;
      }

      &::before {
        position: absolute;
        left: 41px;
        transform: translateX(-50%);
        bottom: 2px;
        width: 91px;
        height: 8px;
        border-radius: 0.3rem;
        content: "";
        background: ${(props) => props.theme.colors.pointGreen};
        z-index: -1;
        transition: 0.2s;
        opacity: 0;

        @media (max-width: 768px) {
          left: 39px;
        }

        @media (max-width: 486px) {
          width: 80px;
          left: 36px;
          bottom: 0;
        }
      }

      &.active::before {
        opacity: 0.6;
      }
    }

    .font-bold {
      font-weight: bold;
    }
  }

  .NavigationElement_newsDiv {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 7px 0;
      cursor: pointer;
      transition: background-color 0.2s;

      @media (max-width: 486px) {
        padding: 5px 0;
      }

      p {
        display: inline-block;
        margin: 0;
        font-size: 1rem;
        max-width: 473px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
          color: #333;
          text-decoration: none;

          span {
            font-size: 17px;
            transition: 0.1s;

            @media (max-width: 768px) {
              font-size: 15px;
            }

            @media (max-width: 486px) {
              font-size: 14px;
            }

            &:hover {
              font-weight: 600;
              text-decoration: underline;
            }
          }
        }
      }

      > span {
        display: inline-block;
        /* margin-top: 0.25rem; */
        font-size: 0.875rem;
        color: #767676;
      }

      .mt-2 {
        margin-top: 0.5rem;
      }

      .text-blue-600 {
        color: #2563eb;
      }

      .text-sm {
        font-size: 0.875rem;

        @media (max-width: 486px) {
          font-size: 12px;
        }
      }
    }
  }
`;
