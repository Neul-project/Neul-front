import { useEffect } from "react";
import { ProgramDetailStyled } from "./styled";
import axiosInstance from "@/lib/axios";

//프로그램 상세 페이지 컴포넌트
const ProgramDetail = (props: { detailid: string }) => {
  const { detailid } = props;

  useEffect(() => {
    //id에 해당하는 프로그램 상세 전체 보기
    // axiosInstance
    //   .get(`/program/detail`, { params: { id: detailid } })
    //   .then((res) => {
    //     console.log("detail res", res.data);
    //   });
  }, []);

  return <ProgramDetailStyled>{detailid}</ProgramDetailStyled>;
};

export default ProgramDetail;
