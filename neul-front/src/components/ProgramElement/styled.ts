import styled from "styled-components";

export const ProgramElementStyled = styled.div`
  &.ProgramElement_main_wrap {
    flex: 0 0 25%;
    padding: 0 15px;
    cursor: pointer;

    .ProgramElement_img {
      width: 100%;
      height: 280px;
      //object-fit: cover;
      background: #e5e5e5;
      border-radius: 5px;
      overflow: hidden;

      .ProgramElement_imgstyle {
        display: block;
        width: 100%;
        transition: transform 0.3s;
      }

      &:hover .ProgramElement_imgstyle {
        transform: scale(1.05); /* 5% 확대 */
      }
    }

    .ProgramElement_content {
      padding: 15px 0;
      text-align: left;

      .ProgramElement_Recruit {
        display: inline-block;
        padding: 5px 6px;
        font-weight: 600;
        font-size: 13px;
        color: #13453c;
        background: #e9f5f3;
        border-radius: 3px;
      }
      /* 모집완료일 때 배경색 */
      .ProgramElement_Recruit_end {
        background-color: #f0f0f0;
        color: #999;
      }
      .ProgramElement_title {
        width: 100%;
        max-width: 280px;
        margin-top: 10px;
        font-family: "GmarketSans";
        font-weight: 500;
        font-size: 25px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ProgramElement_botton_content {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px dashed #ccc;
        font-size: 15px;

        .ProgramElement_category,
        .ProgramElement_progress,
        .ProgramElement_recru {
          padding-bottom: 3px;
        }
      }
    }
  }
`;
