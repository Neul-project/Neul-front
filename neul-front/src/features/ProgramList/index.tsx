import clsx from "clsx";
import { ProgramListStyled } from "./styled";
//import Masonry from "react-masonry-css";

//component
import ProgramElement from "@/components/ProgramElement";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

import { Select, Pagination, ConfigProvider, Input } from "antd";
import { AntdGlobalTheme, GreenTheme } from "@/utils/antdtheme";
import { getRecruitmentState } from "@/utils/getrecruitmentstate";
import { SearchProps } from "antd/es/input";

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
  const { Search } = Input;

  //useState
  const [list, setList] = useState<ProgramDataType[]>(); //전체 리스트
  const [filterStatus, setFilterStatus] = useState<string>("all"); //select에 사용될 모집 상태
  const [searchValue, setSearchValue] = useState("");

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    //프로그램 전체 요청 리스트
    axiosInstance.get("/program/list").then((res: any) => {
      //console.log("program list res", res.data);
      setList(res.data.reverse());
    });
  }, []);

  //프로그램 검색
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    //console.log("value", value);
    setSearchValue(value);
    //프로그램 : 프로그램 제목(title) 검색에 따른 행(피드백) 반환 요청
    axiosInstance
      .get("/program/list", { params: { search: value } })
      .then((res) => {
        const data = res.data.reverse();
        //console.log("data", data);
        setList(data);
        setSearchValue("");
      });
  };

  //select으로 필터 했을 때 실행 함수
  const handleFilterChange = (value: string) => {
    //console.log("va", value);

    axiosInstance.get("/program/list").then((res: any) => {
      //console.log("program list res", res.data);
      setList(res.datareverse());
    });

    setFilterStatus(value);
    setCurrentPage(1); // 필터 바뀌면 1페이지로 초기화
  };

  //페이지네이션 페이지 변경 되었을 때 실행 함수
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 필터링된 리스트 - 모집중 / 모집예정 / 모집완료 분리
  const filteredList = list?.filter((item) => {
    if (filterStatus === "all") return true;
    const state = getRecruitmentState(item.recruitment);
    if (filterStatus === "recruiting") return state === "모집중";
    if (filterStatus === "completed") return state === "모집완료";
    if (filterStatus === "upcoming") return state === "모집예정";
    return true; // 기본값
  });

  // // 현재 페이지에서 보여줄 리스트 - 한 화면에 보여질 리스트 (현재 총 12개)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedList = filteredList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        <ConfigProvider theme={GreenTheme}>
          <Search
            placeholder="프로그램 이름을 입력하시오."
            onSearch={onSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="ProgramList_search"
          />
        </ConfigProvider>
      </div>

      {filteredList && filteredList.length > 0 ? (
        <div className="ProgramList_grid_wrap">
          {paginatedList?.map((element: any) => (
            <ProgramElement
              key={element.id}
              list={element}
              filterStatus={filterStatus}
            />
          ))}
        </div>
      ) : (
        <div className="ProgramList_empty_wrap">
          <div className="empty_img">
            <img src="/empty.svg" alt="emptyImage" />
          </div>
          <div className="ProgramList_empty_message">
            프로그램 준비 중입니다.
          </div>
        </div>
      )}
      <Pagination
        align="center"
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
        simple
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
