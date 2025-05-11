import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KCC-Ahnchangho';
    src: url('/fonts/KCC-Ahnchangho.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

export const StatusStyled = styled.div`
  &.status_wrap {
    font-family: "KCC-Ahnchangho", sans-serif;
    .status_notebook {
      display: block;
    }
    .status_statuscheck {
      display: none;
    }

    @media (max-width: 1200px) {
      .status_notebook {
        display: none;
      }
      .status_statuscheck {
        display: block;
      }
    }
  }
`;
