import styled from "styled-components";

export const MyInfoStyled = styled.div`
  .MyInfo_container {
    width: 857px;
    padding: 20px 29px;
    border-radius: 6px;
    box-shadow: 1px 1px 10px 0 rgba(72, 75, 108, 0.08);
    border: solid 1px #e3e9ed;
    background-color: #fff;
    box-sizing: border-box;
  }

  .MyInfo_flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .MyInfo_cont {
    padding: 12px 0;
  }

  .MyInfo_name {
    font-size: 19px;
    line-height: 29px;
    letter-spacing: -0.63px;
    color: #1c1c1c;
    word-break: break-all;

    span {
      font-size: 21px;
      font-weight: 700;
    }
  }

  .MyInfo_email {
    font-size: 14px;
    color: #848896;
  }

  .MyInfo_changePw {
    padding-right: 10px;

    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: #f6f6f8;
      border: none;
      padding: 9px 12px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: #747783;
    }
  }

  .MyInfo_phone {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(220, 227, 233, 0.8);
    padding: 12px 0;

    .title {
      padding: 10px 0;
    }

    .phone {
      padding-right: 12px;
    }
  }

  .MyInfo_address {
    padding: 12px 0;
    border-top: 1px solid rgba(220, 227, 233, 0.8);
  }

  .MyInfo_withDraw {
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: #bbb;
    font-size: 14px;
    padding: 12px 29px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
