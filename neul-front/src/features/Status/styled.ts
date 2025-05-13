import styled from "styled-components";

export const StatusStyled = styled.div`
  &.status_wrap {
    font-family: "Gamja Flower", sans-serif;
    font-weight: 400;
    font-style: normal;

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
