import { NewsStyled } from "./styled";

import { useState } from "react";

type NewsItem = {
  id: number;
  title: string;
  link: string;
  date: string;
};

const newsList: NewsItem[] = [
  {
    id: 1,
    title: "2025년 제3차 국민연금기금운용위원회 개최",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486137&act=view&",
    date: "2025.05.29",
  },
  {
    id: 2,
    title:
      "보건복지부, 울산광역시, 지역사회 관계 기관이 힘을 모아 중증장애인거주시설의 새로운 모델 제시",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486128&act=view&",
    date: "2025.05.29",
  },
  {
    id: 3,
    title: "정부 대표단, 제157차 WHO 집행이사회 참석",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486127&act=view&",
    date: "2025.05.28",
  },
  {
    id: 4,
    title: "보건복지부, 산재병원 공공성 강화 위한 제도적 기반 마련",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486127&act=view&",
    date: "2025.05.28",
  },
  {
    id: 5,
    title:
      "국민연금공단, 수원시·용인시·고양시와 지역사회 노후소득보장 강화를 위한 업무협약 체결",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486117&act=view&",
    date: "2025.05.28",
  },
  {
    id: 6,
    title: "복지부, 제20기 건강보험정책심의위원회 구성 완료",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486111&act=view&",
    date: "2025.05.28",
  },
  {
    id: 7,
    title: "노인요양시설 확충을 위한 부지 확보 확대",
    link: "https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1486107&act=view&",
    date: "2025.05.28",
  },
];

const noticeList: NewsItem[] = [
  {
    id: 1,
    title: "모자의료 진료협력 시범사업 지침 공고",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486139&act=view&",
    date: "2025.05.29",
  },
  {
    id: 2,
    title:
      "디지털소통팀 공무직 근로자 육아휴직 대체인력(기간제근로자) 채용 공고",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486125&act=view&",
    date: "2025.05.28",
  },
  {
    id: 3,
    title: "보건복지부 요양보험운영과 파견근무자 모집안내(재공고, 3차)",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486104&act=view&",
    date: "2025.05.27",
  },
  {
    id: 4,
    title: "[2025-09호] 민간자격 등록폐지 공고",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486102&act=view&",
    date: "2025.05.26",
  },
  {
    id: 5,
    title:
      "보건복지부 전문임기제 나급 공무원(외신대변인) 경력경쟁채용시험 공고",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486096&act=view&",
    date: "2025.05.26",
  },
  {
    id: 6,
    title: "포괄 2차 종합병원 지원사업 참여기관 공모",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486082&act=view&",
    date: "2025.05.26",
  },
  {
    id: 7,
    title: "국립춘천병원 약무직공무원 경력경쟁채용시험 공고",
    link: "https://www.mohw.go.kr/board.es?mid=a10501010000&bid=0003&list_no=1486074&act=view&",
    date: "2025.05.26",
  },
];

const News = () => {
  const [selectedTab, setSelectedTab] = useState<"news" | "notice">("news");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const activeList = selectedTab === "news" ? newsList : noticeList;

  // 버튼
  const tabItems: { label: string; key: "news" | "notice" }[] = [
    { label: "보도자료", key: "news" },
    { label: "공지사항", key: "notice" },
  ];

  return (
    <NewsStyled>
      <>
        {/* 타이틀 버튼 */}
        <div className="NavigationElement_title2 flex gap-4 mb-4">
          {tabItems.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => {
                setSelectedTab(key);
                setSelectedId(null);
              }}
              className={selectedTab === key ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 내용 */}
        <div>
          <article className="NavigationElement_newsDiv">
            <ul>
              {activeList.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="cursor-pointer py-2 border-b"
                >
                  <p>
                    <a href={item.link} target="_blank">
                      <span title={item.title}>{item.title}</span>
                    </a>
                  </p>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </>
    </NewsStyled>
  );
};

export default News;
