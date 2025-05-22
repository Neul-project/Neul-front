import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";

import { InfoCircleFilled } from "@ant-design/icons";

import { formatAge } from "@/utils/formatter";

import { useEffect, useState } from "react";
import { HelperStyled } from "./styled";
import Image from "next/image";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import "dayjs/locale/ko";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

interface HelperInfo {
  id: number;
  gender: string;
  birth: string;
  profileImage: string;
  certificate: string; // 자격증 pdf파일
  desiredPay: number; // 희망 일당
  experience: string; // 경력사항
  certificateName: string;
  certificateName2: string | null;
  certificateName3: string | null;
  user: {
    id: number;
    name: string;
  };
}

interface HelperTime {
  startDate: string; // "2024-06-01"
  endDate: string; // "2024-06-30"
  week: string[];
}

const HelperFeat = () => {
  const router = useRouter();

  // 도우미 리스트
  const [helpers, setHelpers] = useState<HelperInfo[]>([]);

  const [activeHelper, setActiveHelper] = useState<HelperInfo | null>(null);
  const [helperTime, setHelperTime] = useState<HelperTime | null>(null);
  // 유저가 도우미 신청하는 날짜 범위
  const [selectedRange, setSelectedRange] = useState<[Date, Date] | null>(null);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loadingTime, setLoadingTime] = useState(false);

  // 도우미 리스트 요청
  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const res = await axiosInstance.get("helper/approveduser");
        console.log("도우미 리스트 응답", res.data);

        setHelpers(res.data);
      } catch (error) {
        console.error("도우미 목록 불러오기 실패:", error);
      }
    };

    fetchHelpers();
  }, []);

  // 해당 도우미의 일정 불러오기
  const fetchHelperTime = async (helperId: number) => {
    setLoadingTime(true);
    try {
      const res = await axiosInstance.get(`/helper/time/${helperId}`);
      console.log("도우미 일정 응답", res.data);

      // "sun","mon", "tue", "wed", "thu", "fri", "sat",

      setHelperTime(res.data);
    } catch (error) {
      console.error("근무 가능 날짜 불러오기 실패:", error);
      setHelperTime(null);
    } finally {
      setLoadingTime(false);
    }
  };

  // 날짜 범위 선택 후 도우미 최종신청 요청
  const submitHelperRequest = async (
    helperId: number,
    startDate: Date,
    endDate: Date
  ): Promise<void> => {
    try {
      if (!helperTime) return;

      const dayMap: { [key: number]: string } = {
        0: "sun",
        1: "mon",
        2: "tue",
        3: "wed",
        4: "thu",
        5: "fri",
        6: "sat",
      };

      // 1. 시작 ~ 종료 날짜까지 반복하며 가능한 요일만 필터링
      const validDates: string[] = [];
      let cursor = dayjs(startDate);

      while (cursor.isSameOrBefore(dayjs(endDate), "day")) {
        const weekday = dayMap[cursor.day()];
        if (helperTime.week.includes(weekday)) {
          validDates.push(cursor.format("YYYY-MM-DD"));
        }
        cursor = cursor.add(1, "day");
      }

      // 2. 선택된 날짜가 하나도 없으면 중단
      if (validDates.length === 0) {
        alert("도우미가 선택한 기간 내에서 근무 가능한 요일이 없습니다.");
        return;
      }

      console.log("validDates: ", helperId, validDates);
      // 3. 서버 요청
      const res = await axiosInstance.post("/matching/submit-request", {
        helperId,
        dates: validDates, // ['2025-05-12', '2025-05-13'...]
      });

      console.log("도우미 신청 결과:", res.data);

      if (res.data.ok) {
        alert(
          "신청이 완료되었습니다!\n도우미 승인 후 [마이페이지] → [도우미 신청내역] 메뉴에서 결제를 진행해주세요."
        );

        router.push("/");

        // 초기화 (선택)
        setActiveHelper(null);
        setHelperTime(null);
        setSelectedRange(null);
      }
    } catch (error) {
      console.error("도우미 신청 중 오류 발생:", error);
      alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <HelperStyled>
      <div className="Helper_S_container">
        <div className="Helper_title_container">
          <div className="Helper_title">도우미 신청하기</div>
          <div className="Helper_icon">
            <InfoCircleFilled style={{ fontSize: "16px", color: "#c9c9c9" }} />
          </div>
        </div>

        <div className="Helper_SwiperContainer">
          <Swiper
            navigation
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0, // 회전 없음
              depth: 0, // 3D 깊이 제거
              stretch: 0,
              scale: 0.8, // 기본 scale (중앙 제외)
              modifier: 1, // 효과 강도
              slideShadows: false, // 그림자 제거
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
          >
            {helpers.map((helper) => (
              <SwiperSlide key={helper.id}>
                <div className="Helper_card">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/image/${helper.profileImage}`}
                    alt={helper.user.name}
                    width={250}
                    height={250}
                  />
                  <div className="Helper_content">
                    <div className="Helper_one">
                      <strong>이름:</strong> {helper.user.name}
                    </div>
                    <div className="Helper_one">
                      <strong>성별:</strong> {helper.gender}
                    </div>
                    <div className="Helper_one">
                      <strong>생년월일:</strong> {helper.birth} (
                      {formatAge(helper.birth)})
                    </div>
                    <div className="Helper_one">
                      <strong>희망 일당:</strong>{" "}
                      {helper.desiredPay.toLocaleString()}원
                    </div>
                    <div className="Helper_one">
                      <strong>자격증:</strong> {helper.certificateName}
                    </div>
                    <div className="Helper_one">
                      {helper.certificateName2 && (
                        <>
                          <strong>자격증2:</strong> {helper.certificateName2}
                        </>
                      )}
                    </div>
                    <div className="Helper_one">
                      {helper.certificateName3 && (
                        <>
                          <strong>자격증3:</strong> {helper.certificateName3}
                        </>
                      )}
                    </div>
                    <div className="Helper_one">
                      <strong>경력:</strong> {helper.experience}
                    </div>

                    <div className="Helper_Btn">
                      <button
                        onClick={async () => {
                          console.log("helper", helper);
                          setActiveHelper(helper);
                          await fetchHelperTime(helper.user.id);
                        }}
                      >
                        날짜선택
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 캘린더 로딩 */}
        {loadingTime && (
          <div className="modal-backdrop">
            <div className="modal-content">근무 가능 날짜를 불러오는 중...</div>
          </div>
        )}

        {/* 선택된 도우미의 가능 날짜 표시 */}
        {activeHelper && helperTime && (
          <div className="Helper_select_container">
            <div className="Helper_select">
              <div className="Helper_select_title">
                <strong>{activeHelper.user.name}</strong> 도우미 예약일 선택
              </div>

              <RangePicker
                className="Helper_datePicker"
                classNames={{
                  popup: {
                    root: "custom-datepicker-popup",
                  },
                }}
                value={
                  selectedRange
                    ? [dayjs(selectedRange[0]), dayjs(selectedRange[1])]
                    : null
                }
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setSelectedRange([dates[0].toDate(), dates[1].toDate()]);
                  } else {
                    setSelectedRange(null);
                  }
                }}
                // 비활성화 날짜 범위 체크
                disabledDate={(current) => {
                  if (!current || !helperTime) return true;

                  const from = dayjs(helperTime.startDate);
                  const to = dayjs(helperTime.endDate);
                  const dayOfWeek = current.day(); // 0: Sunday, 1: Monday ...

                  const dayMap: { [key: number]: string } = {
                    0: "sun",
                    1: "mon",
                    2: "tue",
                    3: "wed",
                    4: "thu",
                    5: "fri",
                    6: "sat",
                  };

                  const isInRange =
                    !current.isBefore(from, "day") &&
                    !current.isAfter(to, "day");
                  const isValidDay = helperTime.week.includes(
                    dayMap[dayOfWeek]
                  );

                  return !(isInRange && isValidDay);
                }}
                placeholder={["시작일", "종료일"]}
              />

              <div className="Helper_select_btn">
                <button
                  className="Ok_btn"
                  onClick={() => {
                    if (selectedRange && activeHelper) {
                      submitHelperRequest(
                        activeHelper.user.id,
                        selectedRange[0],
                        selectedRange[1]
                      );
                    } else {
                      alert("날짜를 선택해주세요.");
                    }
                  }}
                >
                  신청하기
                </button>
                <button onClick={() => setActiveHelper(null)}>닫기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HelperStyled>
  );
};

export default HelperFeat;
