import Header from "@/components/Header";
import { ActivityContentStyled } from "./styled";
import clsx from "clsx";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";

//활동 기록 컴포넌트
const ActivityContent = (props: { id: string }) => {
  const { id } = props;

  //useEffect
  useEffect(() => {
    const userId = 1;
    //활동기록리스트 id와 userId에 따른 내용 전체 확인
    axiosInstance.get(`/activity/detail`, {
      params: { userId: userId, id: id },
    });
  }, []);

  return (
    <ActivityContentStyled>
      <h1>{id}</h1>
    </ActivityContentStyled>
  );
};

export default ActivityContent;
