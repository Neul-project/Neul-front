import styled from "styled-components";

export const HelperStyled = styled.div`
  background-color: rgb(242, 245, 248);
  height: 100%;
  min-height: calc(100vh - 155px);

  .Helper_S_container {
    padding: 30px 20px 40px 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .Helper_title_container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .Helper_title {
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }

  .Helper_icon {
    position: relative;
    cursor: pointer;
  }

  .Helper_SwiperContainer {
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 20px;
    margin-bottom: 20px;
  }

  .Helper_card {
    /* border: 1px solid #ddd; */
    margin-bottom: 30px;
    text-align: center;
    transition: all 0.3s ease;
    /* transform: scale(0.85); */
    opacity: 0.7;
    filter: brightness(80%);
  }

  .Helper_one {
    margin-bottom: 7px;
  }

  .warn {
    color: #d50000;
  }

  .Helper_Btn {
    margin-top: 8px;
    text-align: center;

    button {
      cursor: pointer;
      padding: 6px 14px;
      border: 1px solid #dfe4eb;
      border-radius: 6px;
      background-color: ${(props) => props.theme.colors.backColor};

      &:hover {
        font-weight: 700;
      }
    }
  }

  .Helper_select_container {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid #d9d9d9;
    text-align: center;
  }

  .custom_modal_container {
    position: absolute;
    z-index: 10;
    left: -15px;
    top: 30px;
    width: 310px;
    font-size: 13px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 20px;
    line-height: 20px;

    @media (max-width: 632px) {
      left: -171px;
    }
  }

  .modal-title {
    margin-bottom: 5px;
  }

  .custom_content {
    font-size: 12px;
    font-weight: 500;
    margin-top: 5px;

    span {
      font-weight: bolder;
    }
  }

  .Helper_select_title {
    font-size: 19px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .Helper_datePicker {
    width: 304px;
    margin-bottom: 8px;

    @media (max-width: 632px) {
      width: 100%;
    }
  }

  .custom-datepicker-popup .ant-picker-range-wrapper {
    width: 100px !important;
  }

  .custom-datepicker-popup .ant-picker-panel-container {
    width: 100px !important;
  }

  .Helper_select_btn {
    display: flex;
    justify-content: center;
    gap: 13px;

    button {
      cursor: pointer;
      padding: 6px 14px;
      border: 1px solid #dfe4eb;
      border-radius: 6px;
      background-color: #fff;
    }

    .Ok_btn {
      color: #fff;
      background-color: ${(props) => props.theme.colors.pointGreen};
      border: none;

      &:hover {
        background-color: ${(props) => props.theme.colors.softGreen};
      }
    }
  }

  .ant-picker {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .swiper-slide {
    width: 300px;
  }

  .swiper-slide-active .Helper_card {
    transform: scale(1);
    opacity: 1;
    filter: brightness(100%);
  }

  .Helper_content {
    padding: 15px;
    text-align: left;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    /* background: #e0e0e0; */
  }

  .swiper-pagination-bullet-active {
    background: ${(props) => props.theme.colors.pointGreen};
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 27px !important;
    height: 27px !important;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.504);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 632px) {
      width: 23px !important;
      height: 23px !important;
    }
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: rgba(216, 216, 216, 0.797) !important;

    @media (max-width: 632px) {
      font-size: 13px !important;
    }
  }

  /* RangePicker 반응형 관련 */
  @media (max-width: 768px) {
    .Helper_datePicker.ant-picker {
      width: 100%;
    }

    .Helper_datePicker.ant-picker .ant-picker-input {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 8px !important;
    }

    .Helper_datePicker.ant-picker .ant-picker-input > input {
      width: 100% !important;
    }

    .Helper_datePicker.ant-picker .ant-picker-separator {
      display: none !important;
    }
  }
`;
