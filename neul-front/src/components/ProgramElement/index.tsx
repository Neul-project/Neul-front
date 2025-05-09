import clsx from "clsx";
import { ProgramElementStyled } from "./styled";

/*
1.제목/분류/진행기간/모집기간/모집인원
*/

//프로그램 요소 컴포넌트
const ProgramElement = (props: { list: any }) => {
  const { list } = props;
  console.log("list", list);

  return (
    <ProgramElementStyled className={clsx("ProgramElement_main_wrap")}>
      <div>{list.name}</div>
      <div>{list.category}</div>
      <div>진행기간 {list.progress}</div>
      <div>모집기간 {list.recruitment}</div>
      <div>모집인원 {list.capacity}</div>
    </ProgramElementStyled>
  );
};

export default ProgramElement;
