import styled from "styled-components";

export const HelperStyled = styled.div`
  background-color: rgb(242, 245, 248);
  height: 100%;

  .Helper_S_container {
    padding: 20px;
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
    cursor: pointer;
  }

  .Helper_SwiperContainer {
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 20px;
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

  .Helper_Btn {
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
`;
