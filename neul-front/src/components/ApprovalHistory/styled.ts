import styled from "styled-components";

export const ApprovalHistoryStyled = styled.div`
  .ApprovalHistory_container {
    width: 650px;
    padding: 20px 20px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .ApprovalHistory_title {
    font-size: 19px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(51, 51, 51);
  }

  .ApprovalHistory_infoBox {
  }
`;
