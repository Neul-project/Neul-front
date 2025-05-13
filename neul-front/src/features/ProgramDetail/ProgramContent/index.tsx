import clsx from "clsx";
import { ProgramContentStyled } from "./styled";

const ProgramContent = (props: {
  price: string;
  progress: string;
  recruitment: string;
  category: string;
  capacity: string;
  call: string;
}) => {
  const { price, progress, recruitment, category, capacity, call } = props;
  return (
    <ProgramContentStyled className={clsx("ProgramContent_main_wrap")}>
      <div className="ProgramDetail_row">
        <div>가격</div>
        <div>{price}</div>
      </div>
      <div className="ProgramDetail_row">
        <div>진행기간</div>
        <div>{progress}</div>
      </div>
      <div className="ProgramDetail_row">
        <div>모집기간</div>
        <div>{recruitment}</div>
      </div>
      <div className="ProgramDetail_row">
        <div>카테고리</div>
        <div>{category}</div>
      </div>
      <div className="ProgramDetail_row">
        <div>모집인원</div>
        <div>{capacity}</div>
      </div>
      <div className="ProgramDetail_row">
        <div>문의</div>
        <div>{call}</div>
      </div>
    </ProgramContentStyled>
  );
};

export default ProgramContent;
