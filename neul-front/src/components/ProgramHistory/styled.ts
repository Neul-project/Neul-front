import styled from "styled-components";

export const ProgramHistoryStyled = styled.div`
  .ProgramHistory_title {
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .Table_container {
    background-color: #fffefa;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 0 rgba(72, 75, 108, 0.08);
    /* overflow: hidden; */
  }

  .Table_header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    background-color: #fffffe;
  }

  .etc {
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    font-weight: 700;
  }
`;

export const Cell = styled.div<{ $flex: number }>`
  flex: ${({ $flex }) => $flex};
  text-align: center;
  /* border-bottom: 1px solid #ddd; */
`;

export const Btn = styled.button`
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #5da487;
  padding: 6px 13px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -1px;
  color: ${(props) => props.theme.colors.pointGreen};
`;
