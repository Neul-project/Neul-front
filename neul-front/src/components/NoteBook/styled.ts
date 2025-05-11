import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KCC-Ahnchangho';
    src: url('/fonts/KCC-Ahnchangho.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

export const NoteBookStyled = styled.div`
  &.notebook_wrap {
    max-width: 1280px;
    min-height: 809.15px;
    margin: 40px auto;
    font-family: "KCC-Ahnchangho", sans-serif;
    .notebook_box {
      position: absolute;
      min-height: 809.15px;
      display: flex;

      .notebook_spring {
        width: 120px;
        height: 770px;
        position: relative;
        top: 20px;
        left: -55px;
        z-index: 11;

        .notebook_ring {
          width: 110px;
          height: 45px;
          border-radius: 55px 55px 0 0;
          background-color: #ccc;
          position: absolute;
          top: 50px;

          &.notebook_ring2 {
            position: relative;
            top: 130px;
          }
          &.notebook_ring3 {
            position: relative;
            top: 170px;
          }
          &.notebook_ring4 {
            position: relative;
            top: 210px;
          }
          &.notebook_ring5 {
            position: relative;
            top: 255px;
          }
          &.notebook_ring6 {
            position: relative;
            top: 300px;
          }
          &.notebook_ring7 {
            position: relative;
            top: 343px;
          }
          &.notebook_ring8 {
            position: relative;
            top: 385px;
          }

          .notebook_point_box {
            width: 25px;
            height: 20px;
            border-radius: 50%;
            background-color: black;
            position: relative;
            top: 40px;
            left: -5.7px;
            .notebook_point {
              position: relative;
              top: -5px;
              left: 5px;
              border-radius: 50%;
              width: 21px;
              height: 20px;
              background-color: #ccc;
            }
          }

          .notebook_point_box2 {
            width: 25px;
            height: 20px;
            border-radius: 50%;
            background-color: black;
            position: relative;
            top: 20px;
            left: 90px;
            .notebook_point2 {
              position: relative;
              top: -5px;
              border-radius: 50%;
              width: 21px;
              height: 20px;
              background-color: #ccc;
            }
          }

          .notebook_ringbottom {
            width: 70px;
            height: 40px;
            border-radius: 30px 30px 0 0;
            background-color: white;
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 12;
            overflow: hidden;
            .notebook_ringleft {
              width: 37.7px;
              height: 40px;
              background-color: aliceblue;
              position: absolute;
              top: 0px;
              left: 13px;
            }
          }
        }
      }

      .notebook_left {
        width: 600px;
        background-color: aliceblue;
        border-radius: 20px;

        .notebook_note {
          min-height: 750px;
          background-color: white;
          box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          width: 560px;
          position: relative;
          top: 28px;
          left: 18px;

          .notebook_note2 {
            width: 555px;
            position: relative;
            top: 0;
            right: -5px;
            .notebook_note3 {
              width: 550px;
              position: relative;
              top: 0;
              right: -5px;
              .notebook_note4 {
                width: 545px;
                position: relative;
                top: 0;
                right: -5px;
                .notebook_note5 {
                  width: 540px;
                  position: relative;
                  top: 0;
                  right: -5px;
                  .notebook_note6 {
                    width: 535px;
                    position: relative;
                    top: 0;
                    right: -5px;

                    .statuscheck_name {
                      font-size: 22px;
                      font-weight: bolder;
                      position: relative;
                      top: 100px;
                      left: 70px;
                    }
                    .statuscheck_popover {
                      position: relative;
                      top: 76px;
                      left: 210px;
                    }
                    .notebook_img_box {
                      position: relative;
                      left: 55px;
                      top: 150px;
                      z-index: 25;
                      .notebook_img {
                        width: 400px;
                        height: 400px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .notebook_right {
        width: 600px;
        background-color: aliceblue;
        border-radius: 20px;
        position: relative;
        left: -120px;
        .notebook_note {
          min-height: 750px;
          background-color: white;
          box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          width: 560px;
          position: relative;
          top: 28px;
          left: 18px;

          .notebook_note2 {
            width: 555px;
            position: relative;
            top: 0;
            .notebook_note3 {
              width: 550px;
              position: relative;
              top: 0;

              .notebook_note4 {
                width: 545px;
                position: relative;
                top: 0;
                .notebook_note5 {
                  width: 540px;
                  position: relative;
                  top: 0;
                  .notebook_note6 {
                    width: 535px;
                    position: relative;
                    top: 0;
                    right: 2px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .notebook_line {
      width: 420px;
      border: 1px solid #eee;
      opacity: 0.4;
      position: relative;
      top: 150px;
      left: 50px;
      z-index: 20;
      &.notebook_line2 {
        position: relative;
        top: 200px;
      }
      &.notebook_line3 {
        position: relative;
        top: 250px;
      }
      &.notebook_line4 {
        position: relative;
        top: 300px;
      }
      &.notebook_line5 {
        position: relative;
        top: 350px;
      }
      &.notebook_line6 {
        position: relative;
        top: 400px;
      }
      &.notebook_line7 {
        position: relative;
        top: 450px;
      }
      &.notebook_line8 {
        position: relative;
        top: 500px;
      }
      &.notebook_line9 {
        position: relative;
        top: 550px;
      }
      &.notebook_line10 {
        position: relative;
        top: 600px;
      }
    }
  }
`;
