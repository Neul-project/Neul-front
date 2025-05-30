import clsx from "clsx";
import { ProgramContentStyled } from "./styled";
import { getCategoryLabel } from "@/utils/programcategory";
import { formatPhoneNumber } from "@/utils/formatter";

const ProgramContent = (props: {
  price: string;
  progress: string;
  recruitment: string;
  category: string;
  capacity: number;
  call: string;
  target: string;
  note: string;
  manager: string;
  total: number;
}) => {
  const {
    price,
    progress,
    recruitment,
    category,
    capacity,
    call,
    target,
    note,
    manager,
    total,
  } = props;
  return (
    <ProgramContentStyled className={clsx("ProgramContent_main_wrap")}>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">진행기간</div>
        <div className="ProgramDetail_row_detail">{progress}</div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">모집기간</div>
        <div className="ProgramDetail_row_detail">{recruitment}</div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">카테고리</div>
        <div className="ProgramDetail_row_detail">
          {getCategoryLabel(category)}
        </div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">모집인원</div>
        <div className="ProgramDetail_row_detail">
          {total.toLocaleString()} / {capacity.toLocaleString()}명
        </div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">참여대상</div>
        <div className="ProgramDetail_row_detail">{target}</div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">담당자</div>
        <div className="ProgramDetail_row_detail">{manager}</div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">가격</div>
        <div className="ProgramDetail_row_detail">
          {price.toLocaleString()}원
        </div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">문의</div>
        <div className="ProgramDetail_row_detail">
          {formatPhoneNumber(call)}
        </div>
      </div>
      <div className="ProgramDetail_row">
        <div className="ProgramDetail_row_title">프로그램 내용</div>
        <div className="ProgramDetail_row_detail">{note}</div>
      </div>
    </ProgramContentStyled>
  );
};

export default ProgramContent;
