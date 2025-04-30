import { ActivityTableStyled } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";

//antd
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axiosInstance from "@/lib/axios";

interface DataType {
  key: string;
  number: number;
  title: string;
  data: string;
}

//테이블 열
const columns: TableProps<DataType>["columns"] = [
  {
    title: "번호",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "날짜",
    dataIndex: "data",
    key: "data",
  },
];

// **백엔드에서 요청 받아서 표시하기
// axiosInstance.post(`/activity/list/${userid}`).then((res) => {
//   console.log("data res", res.data);
// });

/*
activities table에서 받아야하는 리스트 형식
{
    key: id,
    number: id,
    title: title,
    data: recorded_at,
  },


*/

const data: DataType[] = [
  {
    key: "1",
    number: 1,
    title: "활동기록 1",
    data: "2025년 12월 02일",
  },
];

//활동 기록 테이블 컴포넌트
const ActivityTable = () => {
  const router = useRouter();
  return (
    <ActivityTableStyled className={clsx("ActivityList_main_wrap")}>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onRow={(record, rowIndex) => {
          //record : 클릭된 행 전체 내용 rowIndex 클릭된 행 위치(0부터 시작)
          return {
            onClick: (event) => {
              //console.log("event", record, rowIndex);
              //클릭된 페이지 이동 url : /activity/1
              router.push(`/activity/${record.number}`);
            },
          };
        }}
      />
    </ActivityTableStyled>
  );
};

export default ActivityTable;
