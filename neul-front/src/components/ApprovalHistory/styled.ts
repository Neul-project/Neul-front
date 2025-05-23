import styled from "styled-components";

export const ApprovalHistoryStyled = styled.div`
  @media (max-width: 632px) {
    padding: 0 20px;
  }

  .ApprovalHistory_container {
    /* width: 650px; */
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
    margin-bottom: 20px;
  }

  .ApprovalHistory_infoBox {
  }

  .wrap {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
    border-top: 1px solid rgb(242, 245, 248);
    border-bottom: 1px solid rgb(242, 245, 248);

    @media (max-width: 632px) {
      display: block;
      border-bottom: none;
    }
  }

  .Approval_box {
    display: flex;
    width: 49%;
    /* align-items: center; */

    @media (max-width: 632px) {
      width: 100%;
      border-bottom: 1px solid rgb(242, 245, 248);
    }
  }

  .box1 {
    width: 33%;
    padding: 9px 14px;
    background-color: rgb(237, 242, 247);
    font-size: 14px;

    @media (max-width: 632px) {
      width: 23%;
    }
  }

  .content1 {
    position: relative;
    width: 68%;
    padding: 9px 14px;
    font-size: 14px;

    @media (max-width: 632px) {
      width: 73%;
    }
  }

  .input1 {
    width: 100%;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #bbb;
  }

  .area {
    resize: none;
  }

  .font {
    font-size: 12px;
    border: none;
  }

  .view_file {
    font-size: 13px;
    color: ${(props) => props.theme.colors.pointGreen};

    &:hover {
      text-decoration: underline;
    }
  }

  .Approval_edit {
    cursor: pointer;
    padding: 5px 14px;
    border: 1px solid ${(props) => props.theme.colors.pointGreen};
    color: ${(props) => props.theme.colors.pointGreen};
    border-radius: 6px;
    background-color: #fff;

    &:hover {
      background-color: rgb(242, 245, 248);
    }
  }

  .info {
    cursor: pointer;
    font-size: 13px;
    color: #c9c9c9;
  }

  .custom_modal_container {
    position: absolute;
    z-index: 1;
    right: 0;
    width: 240px;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 20px;
    line-height: 20px;
  }

  .edit_helper_info {
    margin-top: 30px;
    text-align: center;

    button {
      cursor: pointer;

      padding: 7px 14px;
      border: none;
      color: #fff;
      border-radius: 6px;
      background-color: ${(props) => props.theme.colors.pointGreen};

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }

  .error {
    font-size: 12px;
    color: red;
  }
`;
