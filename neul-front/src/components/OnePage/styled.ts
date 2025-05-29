import styled from "styled-components";

export const OnePageStyled = styled.div`
  /* 왼쪽 페이지 */
  &.onepage_left {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    max-width: 700px;
    border-radius: 20px;
    .onepage_note {
      min-height: 750px;
      min-height: 810px;
      background-color: white;
      box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
    }
    .onepage_note1 {
      display: flex;
      justify-content: flex-end;
      max-width: 100%;
      .onepage_note2 {
        display: flex;
        justify-content: flex-end;
        max-width: 99%;
        .onepage_note3 {
          display: flex;
          justify-content: flex-end;
          max-width: 98.9%;
          .onepage_note4 {
            display: flex;
            justify-content: flex-end;
            max-width: 98.6%;
            .onepage_note5 {
              display: flex;
              justify-content: flex-end;
              max-width: 98.5%;
              .onepage_note6 {
                aspect-ratio: 4 / 5;
                position: relative;
                max-width: 98.2%;
                box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.1);

                .onepage_name_box {
                  display: flex;
                  align-items: center;
                  padding: 125px 10px 10px 60px;
                  .onepage_name {
                    font-size: 30px;
                    font-weight: bolder;
                  }
                  .onepage_popover {
                    cursor: pointer;
                    margin-left: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  /* 오른쪽 페이지 */
  &.onepage_right {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-width: 700px;
    border-radius: 20px;

    .onepage_note {
      min-height: 817px;
      height: 100%;
      background-color: white;
      box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
    }

    .onepage_note1 {
      max-width: 100%;
      .onepage_note2 {
        max-width: 99%;
        .onepage_note3 {
          max-width: 98.9%;
          .onepage_note4 {
            max-width: 98.6%;
            .onepage_note5 {
              max-width: 98.5%;
              .onepage_note6 {
                aspect-ratio: 4 / 5;
                position: relative;
                max-width: 98.2%;
                box-shadow: -5px 0px 5px -2px rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
  }

  //활동기록 오른쪽 양쪽버전
  &.onepage_right_activity {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    max-width: 700px;
    border-radius: 20px;

    .onepage_note {
      min-height: 810px;
      height: 100%;
      background-color: white;
      box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
    }
  }

  //활동기록 오른쪽 한쪽 버전
  @media (max-width: 1330px) {
    &.onepage_left {
      display: none;
    }
    &.onepage_right {
      padding: 0 10px;
      display: flex;
      justify-content: center !important;
    }
    &.onepage_right_activity {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      max-width: 700px;
      border-radius: 20px;

      .onepage_note {
        min-height: 810px;
        height: 100%;
        background-color: white;
        box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
      }

      .onepage_note1 {
        max-width: 100%;
        .onepage_note2 {
          max-width: 99%;
          .onepage_note3 {
            max-width: 98.9%;
            .onepage_note4 {
              max-width: 98.6%;
              .onepage_note5 {
                max-width: 98.5%;
                .onepage_note6 {
                  aspect-ratio: 4 / 5;
                  position: relative;
                  max-width: 98.2%;
                  box-shadow: -5px 0px 5px -2px rgba(0, 0, 0, 0.1);
                }
              }
            }
          }
        }
      }
    }

    //activity 한쪽 버전 라인 정리
    @media (max-width: 1330px) {
      &.onepage_right_activity {
        .onepage_line {
          max-width: 530px;
          border: 1px solid #eee;
          opacity: 0.4;
          position: absolute;
          left: 10%;
          width: 80%;
          z-index: 20;

          &.onepage_line1 {
            top: 21.5%;
          }
          &.onepage_line2 {
            top: 30%;
          }
          &.onepage_line3 {
            top: 38%;
          }
          &.onepage_line4 {
            top: 46%;
          }
          &.onepage_line5 {
            top: 54.5%;
          }
          &.onepage_line6 {
            top: 62.5%;
          }
          &.onepage_line7 {
            top: 70.5%;
          }
          &.onepage_line8 {
            top: 79%;
          }
        }
      }
    }

    @media (max-width: 768px) {
      &.onepage_right_activity {
        .onepage_line {
          max-width: 530px;
          border: 1px solid #eee;
          opacity: 0.4;
          position: absolute;
          left: 10%;
          width: 80%;
          z-index: 20;

          &.onepage_line1 {
            top: 14%;
          }
          &.onepage_line2 {
            top: 47%;
          }
          &.onepage_line3 {
            top: 52%;
          }
          &.onepage_line4 {
            top: 57%;
          }
          &.onepage_line5 {
            top: 62%;
          }
          &.onepage_line6 {
            top: 67%;
          }
          &.onepage_line7 {
            top: 72%;
          }
          &.onepage_line8 {
            top: 77%;
          }
        }
      }
    }
  }

  /* 수첩 줄 */
  .onepage_line {
    max-width: 530px;
    border: 1px solid #eee;
    opacity: 0.4;
    position: absolute;
    left: 10%; /* 상대 위치로 변경 */
    width: 80%; /* 비율 기반 */
    z-index: 20;
    &.onepage_line1 {
      top: 21.5%;
    }
    &.onepage_line2 {
      top: 30%;
    }
    &.onepage_line3 {
      top: 38%;
    }
    &.onepage_line4 {
      top: 46%;
    }
    &.onepage_line5 {
      top: 54.5%;
    }
    &.onepage_line6 {
      top: 62.5%;
    }
    &.onepage_line7 {
      top: 70.5%;
    }
    &.onepage_line8 {
      top: 79%;
    }
  }
`;
