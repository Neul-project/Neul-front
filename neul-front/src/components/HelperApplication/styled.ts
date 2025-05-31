import styled from "styled-components";

export const HelperAppStyled = styled.div`
  @media (max-width: 632px) {
    padding: 0 20px;
  }

  .HelperApp_container {
    /* width: 650px; */
    padding: 20px 20px;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    box-sizing: border-box;

    @media (max-width: 632px) {
      width: 100%;
      padding: 20px;
    }
  }

  .HelperApp_title {
    position: relative;
    left: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 19px;
    padding-bottom: 17px;
    border-bottom: 2px solid rgb(51, 51, 51);
    line-height: 31px;
  }

  .info {
    position: relative;
    cursor: pointer;
    font-size: 14px;
    color: #c9c9c9;
  }

  .custom_modal_container {
    position: absolute;
    z-index: 1;
    left: -11px;
    top: 21px;
    width: 240px;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 20px;
    line-height: 20px;
    color: #333;
    font-weight: 400;

    @media (max-width: 785px) {
      left: -100px;
    }
  }

  .mainColor {
    color: ${(props) => props.theme.colors.pointGreen};
  }

  .ProgramHistory_item_container {
    /* padding: 20px 0px; */

    .ProgramHistory_empty {
      display: flex;
      flex-direction: column;
      align-items: center;

      .empty_img {
        margin-top: 10px;
        margin-bottom: 7px;
      }
    }
  }

  .empty {
    padding: 20px 0;
  }

  .HelperApp_Content {
    margin-top: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .HelperApp_flexbox {
    display: flex;
    justify-content: space-between;
    font-size: 19px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .flex_01 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .helper {
    font-size: 16px;
    font-weight: 400;
  }

  .status {
    font-size: 14px;
    font-weight: 400;
    color: gray;
  }

  .HelperApp_btn {
    cursor: pointer;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid ${(props) => props.theme.colors.pointGreen};
    padding: 2px 11px;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -1px;
    color: ${(props) => props.theme.colors.pointGreen};
    transition: 0.2s;

    &:hover {
      border: 1px solid ${(props) => props.theme.colors.pointGreen};
      color: #fff;
      background-color: ${(props) => props.theme.colors.pointGreen};
    }
  }

  .HelperApp_AppContainer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }

  .HelperApp_container2 {
    font-size: 13px;
    line-height: 21px;
  }

  .stress {
    font-size: 14px;
    color: ${(props) => props.theme.colors.pointGreen};

    strong {
      font-size: 15px;
    }
  }

  .man {
    font-size: 14px;
    color: #4a4aff;
  }

  .woman {
    font-size: 14px;
    color: #ff5470;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 36px;

    .number_btn {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-top: 1px solid rgb(221, 221, 221);
      border-right: 1px solid rgb(221, 221, 221);
      border-bottom: 1px solid rgb(221, 221, 221);
      border-image: initial;
      border-left: none;
      cursor: pointer;

      @media (max-width: 632px) {
        width: 26px;
        height: 26px;
      }
    }

    .number_btn.start {
      border-left: 1px solid rgb(221, 221, 221);
    }

    button {
      cursor: pointer;
      border: none;
      background-color: transparent;
    }
  }
`;
