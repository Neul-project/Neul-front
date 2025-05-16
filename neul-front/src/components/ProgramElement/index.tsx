import clsx from "clsx";
import { ProgramElementStyled } from "./styled";
import { useRouter } from "next/router";
import { getCategoryLabel } from "@/utils/programcategory";
import { useEffect, useState } from "react";
import { getRecruitmentState } from "@/utils/getrecruitmentstate";

/*
1.제목/분류/진행기간/모집기간/모집인원
*/

//프로그램 요소 컴포넌트
const ProgramElement = (props: { list: any; filterStatus: any }) => {
  const { list, filterStatus } = props;
  const router = useRouter();
  const [state, setState] = useState("");
  const imgarr = list.img.split(",");

  useEffect(() => {
    const result = getRecruitmentState(list.recruitment);
    if (result) setState(result);
  }, [list.recruitment]);

  // 필터 조건 검사
  const shouldRender = () => {
    if (!filterStatus || filterStatus === "all") return true;
    if (filterStatus === "recruiting") return state === "모집중";
    if (filterStatus === "completed") return state === "모집완료";
    return true;
  };

  if (!shouldRender()) return null; // 조건에 맞지 않으면 렌더링하지 않음

  //해당 상세 프로그램 페이지 이동
  const open_program = () => {
    router.push(`/program/${list.id}`);
  };

  return (
    <ProgramElementStyled
      className={clsx("ProgramElement_main_wrap")}
      onClick={open_program}
    >
      <div className="ProgramElement_img">
        <img
          className="ProgramElement_imgstyle"
          src={process.env.NEXT_PUBLIC_API_URL + "/uploads/image/" + imgarr[0]}
          alt="img"
        />
      </div>
      <div className="ProgramElement_content">
        <div
          className={`ProgramElement_Recruit ${
            state === "모집완료" ? "ProgramElement_Recruit_end" : ""
          }`}
        >
          {state}
        </div>
        <div className="ProgramElement_title">{list.name}</div>
        <div className="ProgramElement_botton_content">
          <div className="ProgramElement_category">
            {getCategoryLabel(list.category)}
          </div>
          <div className="ProgramElement_progress">
            진행기간 {list.progress}
          </div>
          <div className="ProgramElement_recru">
            모집기간 {list.recruitment}
          </div>
          <div className="ProgramElement_capacity">
            모집인원 {list.capacity}명
          </div>
        </div>
      </div>
    </ProgramElementStyled>
  );
};

export default ProgramElement;
