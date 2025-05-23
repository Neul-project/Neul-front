import { DatePicker, ConfigProvider } from "antd";
import { StatusCheckStyled } from "./styled";
import koKR from "antd/lib/locale/ko_KR";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAuthStore } from "@/stores/useAuthStore";
import clip from "@/assets/images/clip.png";
import Image from "next/image";

// 상태 타입
interface StatusType {
  id: number;
  condition: string;
  meal: string;
  medication: string;
  sleep: string;
  pain: string;
  note: string;
  recorded_at: string;
}

// 상태 체크 페이지(처음 입장했을때는 오늘 날짜로 초기화)
const StatusCheck = () => {
  const [status, setStatus] = useState<StatusType[] | null>(null);
  const [name, setName] = useState<string>(""); // 피보호자 이름
  const userId = useAuthStore((state) => state.user?.id);
  console.log("유저 id", userId);
  const today = dayjs(); // 오늘 날짜

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(today);

  // 선택된 날짜로 상태 기록 받기
  const SelectDate = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    const formattedDate = date.format("YYYY-MM-DD");
    // userId와 날짜(2025-04-30)를 보내면 상태 기록 받기
    axiosInstance
      .get("/status/day", {
        params: {
          userId,
          date: String(formattedDate),
        },
      })
      .then((res) => {
        console.log("상태", res.data);
        setStatus(res.data);
      })
      .catch((e) => {
        console.error("상태 불러오기 실패:", e);
        setStatus(null);
      });
  };

  // 날짜 선택시
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (!date) return;
    setSelectedDate(date);
  };

  useEffect(() => {
    // 선택된 날짜로 상태 불러오기
    SelectDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    if (!userId) return;
    // 피보호자 이름은 1번만 불러옴
    // axiosInstance
    //   .get("/patient/name", {
    //     params: { userId },
    //   })
    //   .then((res) => {
    //     setName(res.data.name);
    //     console.log("피보호자이름", res.data.name);
    //   })
    //   .catch((e) => {
    //     console.error("피보호자 이름 불러오기 실패:", e);
    //   });

    // 오늘 날짜 상태 요청
    SelectDate(today);
  }, []);

  return (
    // 달력 한글로
    <ConfigProvider locale={koKR}>
      <StatusCheckStyled className={clsx(`statuscheck_wrap`)}>
        <div className="statuscheck_clip_box">
          <Image className="statuscheck_clip" src={clip} alt="클립" />
        </div>
        <div className="statuscheck_box">
          {/* 피보호자 이름 */}
          {name && <div className="statuscheck_name">{name}님 상태</div>}

          {/* 날짜 선택 */}
          <div className="statuscheck_date">
            <DatePicker
              size="large"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          {/* 상태 */}
          {status && status.length > 0 ? (
            <div className="statuscheck_info">
              {[
                { title: "컨디션", value: status[0].condition },
                { title: "아침 식사량", value: status[0].meal?.split(",")[0] },
                { title: "점심 식사량", value: status[0].meal?.split(",")[1] },
                { title: "저녁 식사량", value: status[0].meal?.split(",")[2] },
                {
                  title: "약 복용 여부",
                  value:
                    status[0].medication === "yes"
                      ? "예"
                      : status[0].medication === "no"
                      ? "아니요"
                      : "없음",
                },
                { title: "수면 시간", value: status[0].sleep, scroll: true },
                { title: "통증 여부", value: status[0].pain, scroll: true },
                {
                  title: "특이사항",
                  value: status[0].note ? status[0].note : "없음",
                  scroll: true,
                },
              ].map((item, index) => (
                <div key={index} className="statuscheck_row">
                  <span className={`statuscheck_title statuscheck_margin`}>
                    {item.title}
                  </span>
                  <span
                    className={`statuscheck_value ${
                      item.scroll ? "scrollable" : ""
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // 아직 등록된 상태가 없는 경우
            <div className="statuscheck_none">등록된 상태가 없습니다.</div>
          )}
        </div>
      </StatusCheckStyled>
    </ConfigProvider>
  );
};

export default StatusCheck;
