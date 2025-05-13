import clsx from "clsx";
import { ProgramImgStyled } from "./styled";

//프로그램 상세 이미지
const ProgramImg = (props: { img: string }) => {
  const { img } = props;
  return (
    <ProgramImgStyled className={clsx("ProgrmaImg_main_wrap")}>
      <img
        className="ProgramImg_imgstyle"
        src={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + img}
        alt="img"
      />
    </ProgramImgStyled>
  );
};

export default ProgramImg;
