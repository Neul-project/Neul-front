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

    button {
      position: relative;
      background: none;
      border: none;
      font-size: 22px;
      font-weight: 600;
      color: #333;
      cursor: pointer;
      transition: 0.2s;

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

      padding: 6px 0;
      cursor: pointer;
      transition: background-color 0.2s;

      p {
        margin: 0;
        font-size: 1rem;

        a {
          color: #333;
          text-decoration: none;

          span {
            display: inline-block;
            max-width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 17px;
            transition: 0.1s;

            &:hover {
              font-weight: 600;
              text-decoration: underline;
            }
          }
        }
      }

      > span {
        display: inline-block;
        margin-top: 0.25rem;
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
      }
    }
  }
`;
