import { ActivityTableStyled, theme } from "./styled";
import clsx from "clsx";
import { useRouter } from "next/router";

//antd
import { ConfigProvider, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface DataType {
  key: string;
  number: number;
  title: string;
  date: string;
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
    dataIndex: "date",
    key: "date",
  },
];

//활동 기록 테이블 컴포넌트
const ActivityTable = () => {
  //변수 선언
  const router = useRouter();
  const { user, isLoggedIn, login, logout } = useAuthStore();

  //useState
  const [datalist, setDataList] = useState<DataType[]>();

  //useEffect
  useEffect(() => {
    //console.log("user", user.id);
    const userId = user?.id;
    //화면 로드 시 테이블 내용 요청
    axiosInstance.get(`/activity/list/${userId}`).then((res) => {
      console.log("data res", res.data);

      const formatdata: DataType[] = res.data.map((item: any) => ({
        key: String(item.id),
        number: item.id,
        title: item.title,
        date: item.recorded_at,
      }));

      setDataList(formatdata);
    });
  }, []);

  return (
    <ActivityTableStyled className={clsx("ActivityList_main_wrap")}>
      <ConfigProvider theme={theme}>
        <Table<DataType>
          columns={columns}
          dataSource={datalist}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                router.push(`/activity/${record.number}`);
              },
            };
          }}
        />
      </ConfigProvider>
    </ActivityTableStyled>
  );
};

export default ActivityTable;
