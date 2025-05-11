import clsx from "clsx";
import { ProgramElementStyled } from "./styled";
import { useRouter } from "next/router";

/*
1.제목/분류/진행기간/모집기간/모집인원
*/

//프로그램 요소 컴포넌트
const ProgramElement = (props: { list: any }) => {
  const { list } = props;
  const router = useRouter();
  //console.log("list", list);

  //해당 상세 프로그램 페이지 이동
  const open_program = () => {
    router.push(`/program/${list.key}`);
  };

  return (
    <ProgramElementStyled
      className={clsx("ProgramElement_main_wrap")}
      onClick={open_program}
    >
      <div className="ProgramElement_title">{list.name}</div>
      <div className="ProgramElement_category">{list.category}</div>
      <div className="ProgramElement_img">
        <img
          src={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + list.img}
          alt="img"
        />
      </div>
      <div className="ProgramElement_progress">진행기간 {list.progress}</div>
      <div className="ProgramElement_recru">모집기간 {list.recruitment}</div>
      <div className="ProgramElement_capacity">모집인원 {list.capacity}</div>
    </ProgramElementStyled>
  );
};

export default ProgramElement;
