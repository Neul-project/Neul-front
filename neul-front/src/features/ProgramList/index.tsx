import clsx from "clsx";
import { ProgramListStyled } from "./styled";
import Masonry from "react-masonry-css";

//component
import ProgramElement from "@/components/ProgramElement";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import Circle from "@/components/Circle";

//image
import backimg from "@/assets/images/visual-bg.png";

//프로그램 데이터 타입
interface ProgramDataType {
  key: number; //key -> id
  category: string; //카테고리
  name: string; //프로그램명
  img: string; //이미지
  progress: string; //진행기간
  recruitment: string; //모집기간
  price: number; //가격
  manager: string; //담당자
  capacity: number; //모집인원
  call: string; //문의전화
  registration_at: string; //등록된 시각
}

//프로그램 리스트 컴포넌트
const ProgramList = () => {
  //변수선언

  //useState
  const [list, setList] = useState<ProgramDataType[]>();

  useEffect(() => {
    //프로그램 전체 요청 리스트
    axiosInstance.get("/program/list").then((res) => {
      //console.log("program list res", res.data);
      setList(res.data);
    });
  }, []);

  return (
    <ProgramListStyled className={clsx("ProgramList_main_wrap")}>
      <div className="ProgramList_title">프로그램 리스트</div>

      <div className="ProgramList_grid_wrap">
        {list?.map((element: any) => (
          <ProgramElement key={element.id} list={element} />
        ))}
      </div>
    </ProgramListStyled>
  );
};

export default ProgramList;
