import { theme } from "antd";
import styled from "styled-components";

export const LoadingStyled = styled.div`
  .Loading_center {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 9999;
  }
  .Loading_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .Loading_img_box {
    width: 195px;

    img {
      width: 100%;
    }
  }

  .Loading_text {
    font-size: 15px;
    padding-top: 10px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
