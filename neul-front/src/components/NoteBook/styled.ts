import styled from "styled-components";

export const NoteBookStyled = styled.div`
  &.notebook_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 809.15px;
    margin: 40px auto;

    .notebook_box {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      width: 100%;
      min-height: 809.15px;

      .notebook_spring {
        width: 120px;
        height: 770px;
        z-index: 11;
        position: absolute;
        top: -40px;
        left: 545px;

        .notebook_ring {
          width: 80px;
          height: 40px;
          border-radius: 40px 40px 0 0;
          background-color: #ccc;
          position: absolute;
          top: 50px;
          right: 29px;

          &.notebook_ring2 {
            position: relative;
            top: 130px;
            right: -11px;
          }
          &.notebook_ring3 {
            position: relative;
            top: 170px;
            right: -11px;
          }
          &.notebook_ring4 {
            position: relative;
            top: 210px;
            right: -11px;
          }
          &.notebook_ring5 {
            position: relative;
            top: 255px;
            right: -11px;
          }
          &.notebook_ring6 {
            position: relative;
            top: 300px;
            right: -11px;
          }
          &.notebook_ring7 {
            position: relative;
            top: 343px;
            right: -11px;
          }
          &.notebook_ring8 {
            position: relative;
            top: 385px;
            right: -11px;
          }

          .notebook_point_box {
            width: 16px;
            height: 13px;
            border-radius: 50%;
            background-color: black;
            position: relative;
            top: 30px;
            left: -5.8px;
            .notebook_point {
              position: relative;
              top: -5px;
              left: 6px;
              border-radius: 50%;
              width: 12px;
              height: 13px;
              background-color: #ccc;
            }
          }

          .notebook_point_box2 {
            width: 16px;
            height: 13px;
            border-radius: 50%;
            background-color: black;
            position: relative;
            top: 17px;
            left: 69px;
            .notebook_point2 {
              position: relative;
              top: -6px;
              left: -2px;
              border-radius: 50%;
              width: 12px;
              height: 13px;
              background-color: #ccc;
            }
          }

          .notebook_ringbottom {
            width: 60px;
            height: 50px;
            border-radius: 30px 30px 0 0;
            background-color: white;
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 12;
            overflow: hidden;
            .notebook_ringleft {
              width: 25px;
              height: 50px;
              /* background-color: aliceblue; */
              position: absolute;
              top: 0px;
              left: 17px;
              box-shadow: inset 5px 0 3px -2px rgba(0, 0, 0, 0.1),
                inset -5px 0 3px -2px rgba(0, 0, 0, 0.1);
            }
          }
        }
      }

      .notebook_left {
        width: 100%;
        max-width: 600px;
        min-height: 810px;
        /* background-color: aliceblue; */
        border-radius: 20px;
        position: relative;

        .notebook_note {
          min-height: 750px;
          background-color: white;
          box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          max-width: 560px;
          width: 100%;
          position: relative;
          top: 28px;
          left: 18px;

          .notebook_note2 {
            max-width: 555px;
            width: 100%;
            position: relative;
            top: 0;
            right: -5px;
            .notebook_note3 {
              max-width: 550px;
              width: 100%;
              position: relative;
              top: 0;
              right: -5px;
              .notebook_note4 {
                width: 100%;
                max-width: 545px;
                position: relative;
                top: 0;
                right: -5px;
                .notebook_note5 {
                  width: 100%;
                  max-width: 540px;
                  position: relative;
                  top: 0;
                  right: -5px;
                  .notebook_note6 {
                    width: 100%;
                    max-width: 550px;
                    position: relative;
                    top: 0;
                    right: -5px;
                    box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.1);

                    .notebook_name_box {
                      display: flex;
                      align-items: center;
                      padding: 100px 10px 10px 60px;
                      .notebook_name {
                        font-size: 30px;
                        font-weight: bolder;
                      }
                      .notebook_popover {
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

      .notebook_right {
        width: 100%;
        max-width: 600px;
        min-height: 810px;
        /* background-color: aliceblue; */
        border-radius: 20px;
        position: relative;
        .notebook_note {
          min-height: 750px;
          background-color: white;
          box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          width: 100%;
          max-width: 560px;
          position: relative;
          top: 28px;
          left: 18px;

          .notebook_note2 {
            width: 100%;
            max-width: 555px;
            position: relative;
            top: 0;
            .notebook_note3 {
              width: 100%;
              max-width: 550px;
              position: relative;
              top: 0;

              .notebook_note4 {
                width: 100%;
                max-width: 545px;
                position: relative;
                top: 0;
                .notebook_note5 {
                  width: 100%;
                  max-width: 540px;
                  position: relative;
                  top: 0;
                  .notebook_note6 {
                    width: 100%;
                    max-width: 550px;
                    position: relative;
                    top: 0;
                    right: 10px;
                    box-shadow: -5px 0px 5px -2px rgba(0, 0, 0, 0.1);
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
