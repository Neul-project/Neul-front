import React from "react";
import clsx from "clsx";
import { CircleStyled } from "./styled";

const Circle = (props: {
  title: string;
  width: string;
  left: string;
  top: string;
  titletop: string;
}) => {
  const { title, width, left, top, titletop } = props;
  return (
    <CircleStyled
      className={clsx("Circle_title_background")}
      $width={width}
      $top={top}
      $left={left}
      $titletop={titletop}
    >
      {/* <ul className="Circle_title_circle">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
      <p>{title}</p>
    </CircleStyled>
  );
};

export default Circle;
