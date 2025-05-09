import clsx from "clsx";
import { ProgramListStyled } from "./styled";

//component
import ProgramElement from "@/components/ProgramElement";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

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
  regostratopm_at: string; //등록된 시각
}

//dummy data
const data = {
  key: 1,
  category: "놀이",
  name: "박람회 견학",
  img: "heat.png",
  progress: "2025.07.12~2025.07.13",
  recruitment: "2025.05.01~2025.05.31",
  price: 12000,
  manager: "어드민",
  capacity: 15,
  call: "010-0000-0000",
  regostratopm_at: "2025년 05월 09일 16시 12분",
};

//프로그램 리스트 컴포넌트
const ProgramList = () => {
  //변수선언

  //useState
  const [list, setList] = useState<ProgramDataType>(data);

  useEffect(() => {
    //프로그램 전체 요청 리스트
    // axiosInstance.get("/program/list").then((res) => {
    //   console.log("program list res", res.data);
    //   setList(res.data);
    // });
  }, []);
  return (
    <ProgramListStyled className={clsx("ProgramElement_main_wrap")}>
      <div>프로그램 리스트</div>
      <ProgramElement list={list} />
    </ProgramListStyled>
  );
};

export default ProgramList;
