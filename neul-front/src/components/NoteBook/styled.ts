import styled from "styled-components";

export const NoteBookStyled = styled.div`
  &.notebook_wrap {
    max-width: 1280px;
    width: 100%;
    min-height: 809.15px;

    .notebook_box {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      /* position: relative; */
      width: 100%;
      min-height: 809.15px;
      margin: 40px auto;

      .notebook_left {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        max-width: 700px;
        min-height: 810px;
        border-radius: 20px;
        /* position: relative; */

        .notebook_note {
          min-height: 750px;
          background-color: white;
          box-shadow: -2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          display: flex;
          justify-content: flex-end;
          max-width: 560px;
          width: 100%;
          /* position: relative;
          top: 28px;
          left: 18px; */

          .notebook_note2 {
            display: flex;
            justify-content: flex-end;
            max-width: 555px;
            width: 100%;
            /* position: relative;
            top: 0;
            right: -5px; */
            .notebook_note3 {
              display: flex;
              justify-content: flex-end;
              max-width: 550px;
              width: 100%;
              /* position: relative;
              top: 0;
              right: -5px; */
              .notebook_note4 {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                max-width: 545px;
                /* position: relative;
                top: 0;
                right: -5px; */
                .notebook_note5 {
                  display: flex;
                  justify-content: flex-end;
                  width: 100%;
                  max-width: 540px;
                  /* position: relative;
                  top: 0;
                  right: -5px; */
                  .notebook_note6 {
                    width: 100%;
                    max-width: 550px;
                    /* position: relative;
                    top: 0;
                    right: -5px; */
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

      @media (max-width: 1152px) {
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
        /* position: relative; */
        .notebook_note {
          min-height: 810px;
          height: 100%;
          background-color: white;
          box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1);
        }

        .notebook_note1 {
          width: 100%;
          max-width: 560px;
          /* position: relative;
          top: 28px;
          left: 18px; */

          .notebook_note2 {
            width: 100%;
            max-width: 555px;
            /* position: relative;
            top: 0; */
            .notebook_note3 {
              width: 100%;
              max-width: 550px;
              /* position: relative;
              top: 0; */

              .notebook_note4 {
                width: 100%;
                max-width: 545px;
                /* position: relative;
                top: 0; */
                .notebook_note5 {
                  width: 100%;
                  max-width: 540px;
                  /* position: relative;
                  top: 0; */
                  .notebook_note6 {
                    width: 100%;
                    max-width: 550px;
                    /* position: relative;
                    top: 0; */
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
