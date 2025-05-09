import styled from "styled-components";

export const JoinStyled = styled.div`
  .Join_logoWrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 10px;

    @media (max-width: 506px) {
      margin-top: 65px;
    }
  }

  .Join_selectBox {
    width: 640px;
    max-width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-right: 24px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 506px) {
      width: 320px;
    }
  }

  .ant-select-selector {
    border: 2px solid #cfcfcf !important;

    &:focus-within {
      box-shadow: 0 0 4px 2px #fef6d4 !important;
    }
  }

  .Join_validation {
    position: relative;
    padding-left: 8px;
    width: 460px;
    color: rgb(240, 63, 64);
    font-size: 13px;
    margin-top: 4px;

    &::before {
      position: absolute;
      top: 9px;
      left: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: red;
      content: "";
    }

    @media (max-width: 506px) {
      width: 320px;
    }
  }

  .Join_width {
    position: relative;
    width: 330px;
  }

  .joinBtn {
    padding-top: 40px;
    border-top: 1px solid rgb(247, 247, 247);
  }

  .Join_domain {
    position: absolute;
    top: 13px;
    right: 19px;
    color: gray;
  }
`;
