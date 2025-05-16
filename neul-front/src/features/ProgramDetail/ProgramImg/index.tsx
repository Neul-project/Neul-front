import clsx from "clsx";
import { ProgramImgStyled } from "./styled";
import SubImg from "../SubImg";
import { useEffect, useState } from "react";

//프로그램 상세 이미지
const ProgramImg = (props: { imgarr: string[] }) => {
  const { imgarr } = props;
  //console.log("img", imgarr[0]);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    if (imgarr.length > 0) {
      setMainImg(imgarr[0]);
    }
  }, [imgarr]);

  return (
    <ProgramImgStyled className={clsx("ProgrmaImg_main_wrap")}>
      <div className="ProgramImg_main">
        <img
          className="ProgramImg_imgstyle"
          src={process.env.NEXT_PUBLIC_API_URL + "/uploads/image/" + mainImg}
          alt="img"
        />
      </div>
      <SubImg imgarr={imgarr} setMainImg={setMainImg} />
    </ProgramImgStyled>
  );
};
``;
export default ProgramImg;
