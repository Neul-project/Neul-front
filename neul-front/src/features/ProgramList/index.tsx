import clsx from "clsx";
import { ProgramListStyled } from "./styled";
//import Masonry from "react-masonry-css";

//component
import ProgramElement from "@/components/ProgramElement";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

import { Select, Pagination, ConfigProvider } from "antd";
import { AntdGlobalTheme } from "@/utils/antdtheme";
import { getRecruitmentState } from "@/utils/getrecruitmentstate";

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
  const { Option } = Select;
  //useState
  const [list, setList] = useState<ProgramDataType[]>();
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const handleFilterChange = (value: string) => {
    //console.log("va", value);
    setFilterStatus(value);
    setCurrentPage(1); // 필터 바뀌면 1페이지로 초기화
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 필터링된 리스트
  const filteredList = list?.filter((item) => {
    if (filterStatus === "all") return true;
    const state = getRecruitmentState(item.recruitment);
    if (filterStatus === "recruiting") return state === "모집중";
    if (filterStatus === "completed") return state === "모집완료";
    if (filterStatus === "upcoming") return state === "모집예정";
    return true; // 혹은 기본값
  });

  // 현재 페이지에서 보여줄 리스트
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    //프로그램 전체 요청 리스트
    axiosInstance.get("/program/list").then((res) => {
      //console.log("program list res", res.data);
      setList(res.data.reverse());
    });
  }, []);

  //console.log("filteredList", filteredList);
  return (
    <ProgramListStyled className={clsx("ProgramList_main_wrap")}>
      <div className="ProgramList_title">프로그램 리스트</div>
      <div className="ProgramList_subtitle">
        <ConfigProvider theme={AntdGlobalTheme}>
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={handleFilterChange}
          >
            <Option value="all">전체</Option>
            <Option value="recruiting">모집중</Option>
            <Option value="completed">모집완료</Option>
            <Option value="upcoming">모집예정</Option>
          </Select>
        </ConfigProvider>
      </div>

      <div className="ProgramList_grid_wrap">
        {filteredList && filteredList.length > 0 ? (
          paginatedList?.map((element: any) => (
            <ProgramElement
              key={element.id}
              list={element}
              filterStatus={filterStatus}
            />
          ))
        ) : (
          <div className="ProgramList_empty_message">
            프로그램 준비 중입니다.
          </div>
        )}
      </div>
      <Pagination
        align="center"
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
        current={currentPage}
        pageSize={itemsPerPage}
        total={filteredList?.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        className="ProgramList_pagination"
      />
    </ProgramListStyled>
  );
};

export default ProgramList;
