import styled from "styled-components";

export const WardInfoStyled = styled.div`
  .WardInfo_container {
    padding: 20px 29px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;
  }

  .m-b {
    margin-bottom: 18px;
  }

  .WardInfo_cont {
    padding: 12px 0;
  }

  .WardInfo_name {
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

  .WardInfo_email {
    font-size: 14px;
    color: #848896;
  }

  .WardInfo_wardContainer {
    width: 100%;
  }

  .WardInfo_wardTitle {
    font-size: 19px;
    font-weight: 700;
  }

  .WardInfo_wardName {
  }

  .man {
    color: #4a4aff;
  }

  .woman {
    color: #ff5470;
  }

  .WardInfo_birth {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .WardInfo_significant {
    padding: 12px 0;
  }

  .WardInfo_cont2 {
    /* padding-bottom: 12px; */
  }

  .WardInfo_sqare {
    width: 100%;
    padding: 10px 0px;
    /* border: 2px solid rgba(146, 146, 148, 0.3);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); */
  }

  .WardInfo_editBtn {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0 0 0;

    button {
      cursor: pointer;
      border-radius: 4px;
      background-color: ${(props) => props.theme.colors.pointGreen};
      border: none;
      padding: 9px 18px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -1px;
      color: #fff;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }
`;
