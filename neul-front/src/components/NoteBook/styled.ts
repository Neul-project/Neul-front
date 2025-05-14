import styled from "styled-components";

export const NoteBookStyled = styled.div`
  &.notebook_wrap {
    font-family: "Gowun Batang", serif;
    font-weight: 400;
    font-style: normal;

    max-width: 1280px;
    width: 100%;
    min-height: 809.15px;
    margin: 0 auto;

    .notebook_box {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      min-height: 809.15px;
      margin: 40px auto;

      .notebook_left {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        max-width: 700px;
        border-radius: 20px;

        .notebook_note {
          min-height: 750px;
          min-height: 810px;
          background-color: white;
          box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          display: flex;
          justify-content: flex-end;
          max-width: 100%;
          .notebook_note2 {
            display: flex;
            justify-content: flex-end;
            max-width: 99%;
            .notebook_note3 {
              display: flex;
              justify-content: flex-end;
              max-width: 98.9%;
              .notebook_note4 {
                display: flex;
                justify-content: flex-end;
                max-width: 98.6%;
                .notebook_note5 {
                  display: flex;
                  justify-content: flex-end;
                  max-width: 98.5%;
                  .notebook_note6 {
                    aspect-ratio: 4 / 5;
                    position: relative;
                    max-width: 98.2%;
                    box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.1);

                    .notebook_name_box {
                      display: flex;
                      align-items: center;
                      padding: 125px 10px 10px 60px;
                      .notebook_name {
                        font-size: 30px;
                        font-weight: bolder;
                      }
                      .notebook_popover {
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

      @media (max-width: 1330px) {
        .notebook_left {
          display: none;
        }
        .notebook_right {
          padding: 0 10px;
          display: flex;
          justify-content: center !important;
        }
      }

      .notebook_right {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        max-width: 700px;
        border-radius: 20px;
        .notebook_note {
          min-height: 810px;
          height: 100%;
          background-color: white;
          box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          max-width: 100%;
          .notebook_note2 {
            max-width: 99%;
            .notebook_note3 {
              max-width: 98.9%;
              .notebook_note4 {
                max-width: 98.6%;
                .notebook_note5 {
                  max-width: 98.5%;
                  .notebook_note6 {
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
    }

    /* 수첩 줄 */
    .notebook_line {
      max-width: 530px;
      border: 1px solid #eee;
      opacity: 0.4;
      position: absolute;
      left: 10%; /* 상대 위치로 변경 */
      width: 80%; /* 비율 기반 */
      z-index: 20;
      &.notebook_line1 {
        top: 21.5%;
      }
      &.notebook_line2 {
        top: 30%;
      }
      &.notebook_line3 {
        top: 38%;
      }
      &.notebook_line4 {
        top: 46%;
      }
      &.notebook_line5 {
        top: 54.5%;
      }
      &.notebook_line6 {
        top: 62.5%;
      }
      &.notebook_line7 {
        top: 70.5%;
      }
      &.notebook_line8 {
        top: 79%;
      }
    }
  }
`;
