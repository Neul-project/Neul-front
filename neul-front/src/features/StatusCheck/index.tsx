import { DatePicker, ConfigProvider } from "antd";
import { StatusCheckStyled } from "./styled";
import koKR from "antd/lib/locale/ko_KR";
import dayjs from "dayjs";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import clsx from "clsx";

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

  const userId = 1; //임의로 사용자 id설정
  const today = dayjs(); // 오늘 날짜

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(today);

  // 선택된 날짜로 상태 기록 받기
  const SelectDate = (date: dayjs.Dayjs | null) => {
    if (!date) return;

    const selectedDate = date.format("YYYY-MM-DD");
    console.log(selectedDate);
    // userId와 날짜(2025-04-30)를 보내면 상태 기록 받기
    axiosInstance
      .get("/status/day", {
        params: {
          userId,
          date: String(selectedDate),
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
    // 피보호자 이름은 1번만 불러옴
    axiosInstance
      .get("/status/name", {
        params: { userId },
      })
      .then((res) => {
        setName(res.data);
      })
      .catch((e) => {
        console.error("피보호자 이름 불러오기 실패:", e);
      });

    // 오늘 날짜 상태 요청
    SelectDate(today);
  }, []);

  return (
    // 달력 한글로
    <ConfigProvider locale={koKR}>
      <StatusCheckStyled className={clsx("statuscheck_wrap")}>
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
                { title: "수면 시간", value: status[0].sleep },
                { title: "통증 여부", value: status[0].pain },
                {
                  title: "특이사항",
                  value: status[0].note ? status[0].note : "없음",
                },
              ].map((item, index) => (
                <div key={index} className="statuscheck_row">
                  <span className="statuscheck_title">{item.title}</span>
                  <span className="statuscheck_value">{item.value}</span>
                </div>
              ))}
              <div className="statuscheck_explanation">
                <p>
                  <strong>컨디션 기준</strong> <br />
                  - 아주 좋음: 피보호자가 매우 건강하고 활동적임. <br />
                  - 좋음: 건강하지만 약간의 피로감을 느낄 수 있음. <br />
                  - 보통: 특별한 문제가 없지만 조금 피곤해 보임. <br />
                  - 나쁨: 건강 상태가 좋지 않거나 피로가 심함. <br />- 아주
                  나쁨: 피보호자의 상태가 매우 나쁘고, 즉각적인 관리가 필요함.
                </p>
                <br />
                <p>
                  <strong>식사량 기준</strong> <br />
                  - 완식: 식사를 모두 섭취함. <br />
                  - 대부분 섭취: 식사량의 80% 이상 섭취함. <br />
                  - 절반 섭취: 식사량의 50% 정도 섭취함. <br />
                  - 조금 섭취: 식사량의 30% 미만 섭취함. <br />- 식사 거부:
                  식사를 거부하거나 거의 섭취하지 않음.
                </p>
              </div>
            </div>
          ) : (
            // 아직 등록된 상태가 없는 경우
            <div className="statuscheck_none">오늘 등록된 상태가 없습니다.</div>
          )}
        </div>
      </StatusCheckStyled>
    </ConfigProvider>
  );
};

export default StatusCheck;
