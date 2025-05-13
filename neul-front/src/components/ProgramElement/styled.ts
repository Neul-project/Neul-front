import styled from "styled-components";

export const ProgramElementStyled = styled.div`
  &.ProgramElement_main_wrap {
    width: 100%;
    min-height: 200px;
    border-radius: 15px;
    box-shadow: 0 0 20px -9px rgba(0, 0, 0, 0.3);
    //border: 1px solid black;
    //background: #5da487;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-left: 20px;
    transition: transform 0.2s ease;
    cursor: pointer;
    height: 100%;
    justify-content: center;

    &:hover {
      transform: translateY(-8px);
    }

    .ProgramElement_title {
      padding: 5px;
      font-size: 24px;

      font-weight: bold;
    }
    .ProgramElement_progress,
    .ProgramElement_category,
    .ProgramElement_recru,
    .ProgramElement_capacity {
      padding: 2px;
      font-size: 15px;
    }
  }
`;
