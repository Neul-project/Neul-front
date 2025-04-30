import { DatePicker, ConfigProvider } from "antd";
import { StatusCheckStyled } from "./styled";
import koKR from "antd/lib/locale/ko_KR";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import clsx from "clsx";

/* 백엔드랑 연결할거 -> 24번째줄(해당하는 날짜와 
사용자에 해당하는 피보호자 이름과 상태 불러오기) */

//피보호자이름, 식사 객체, 약 복용여부, 수면시간, 통증 여부, 특이사항 받아옴
interface StatusType {
  id: number;
  name: string;
  condition: string;
  meal: string[];
}

const dummyData = {
  id: 17,
  patientId: 4,
  adminId: 2,
  name: "홍길동",
  condition: "양호",
  meal: {
    breakfast: "많이 먹음",
    lunch: "조금 먹음",
    dinner: "안 먹음",
  },
  medication: "yes",
  sleep: 6.5,
  pain: false,
  note: "특이사항 없음",
  recordedAt: "2025-04-30T10:15:00Z",
};

// 상태 체크 페이지(처음 입장했을때는 오늘 날짜로 초기화)
const StatusCheck = () => {
  const [status, setStatus] = useState();
  const userId = 1; //임의로 사용자 id설정
  const today = dayjs(); // 오늘 날짜

  // 날짜 선택
  const SelectDate = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    const selectedDate = date.format("YYYY-MM-DD");

    // userId와 날짜(2025-04-30)를 보내면 피보호자의 이름과 상태 기록 받기
    axiosInstance
      .get("/status", {
        params: {
          userId,
          date: selectedDate,
        },
      })
      .then((res) => {
        console.log("상태:", res.data);
        setStatus(res.data);
      })
      .catch((e) => {
        console.error("상태 불러오기 실패:", e);
      });
  };

  useEffect(() => {
    // 오늘 날짜로 데이터 요청
    SelectDate(today);
  }, []);

  return (
    <ConfigProvider locale={koKR}>
      <StatusCheckStyled className={clsx("statuscheck_wrap")}>
        <div className="statuscheck_name">000님 상태</div>
        <div className="statuscheck_date">
          <DatePicker size="large" onChange={SelectDate} defaultValue={today} />
        </div>
        <div></div>
      </StatusCheckStyled>
    </ConfigProvider>
  );
};

export default StatusCheck;
