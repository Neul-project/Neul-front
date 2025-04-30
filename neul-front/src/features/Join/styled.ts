import styled from "styled-components";

export const JoinStyled = styled.div`
  .Join_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .Join_submit_btn {
    button {
      background-color: ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 7px 14px;
      font-weight: 700;
    }
  }
`;
