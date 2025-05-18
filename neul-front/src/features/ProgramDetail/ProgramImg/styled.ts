import styled from "styled-components";

export const ProgramImgStyled = styled.div`
  &.ProgrmaImg_main_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    cursor: pointer;
    //border: 1px solid black;
    .ProgramImg_main {
      height: 400px;
      //border: 1px solid black;
    }
    .ProgramImg_imgstyle {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  @media (max-width: 768px) {
    &.ProgrmaImg_main_wrap {
      .ProgramImg_main {
        height: 380px;
        //border: 1px solid black;
      }
    }
  }

  @media (max-width: 486px) {
    &.ProgrmaImg_main_wrap {
      .ProgramImg_main {
        height: 300px;
        //border: 1px solid black;
      }
    }
  }
`;
