import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination } from "swiper/modules";

import { InfoCircleFilled } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { HelperStyled } from "./styled";
import Image from "next/image";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import axiosInstance from "@/lib/axios";
import { resolve } from "path/win32";

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
    name: string;
  };
}

interface HelperTime {
  availableFrom: string; // "2024-06-01"
  availableTo: string; // "2024-06-30"
}

const HelperFeat = () => {
  // 도우미 리스트
  const [helpers, setHelpers] = useState<HelperInfo[]>([]);

  const [activeHelper, setActiveHelper] = useState<HelperInfo | null>(null);
  const [helperTime, setHelperTime] = useState<HelperTime | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
      // const res = await axiosInstance.get(`/helper/time/${helperId}`);
      // console.log("도우미 일정 응답",res.data)

      // 더미 테스트용
      const res: HelperTime = {
        availableFrom: "2025-05-10",
        availableTo: "2025-06-25",
      };

      setHelperTime(res);
    } catch (error) {
      console.error("근무 가능 날짜 불러오기 실패:", error);
      setHelperTime(null);
    } finally {
      setLoadingTime(false);
    }
  };

  // 날짜선택 후 도우미 최종신청 요청
  const submitHelperRequest = async (
    helperId: number,
    selectedDate: Date
  ): Promise<void> => {
    if (!activeHelper || !selectedDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    try {
      const day = dayjs(selectedDate).format("YYYY-MM-DD");

      const res = await axiosInstance.post("/helper/submit-request", {
        helperId,
        date: day, // "YYYY-MM-DD"
      });

      console.log("도우미 신청 결과:", res.data);

      if (res.data.ok) {
        alert("신청이 완료되었습니다!");

        // 초기화
        // setActiveHelper(null);
        // setHelperTime(null);
        // setSelectedDate(null);
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
            modules={[EffectCoverflow, Pagination]}
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
                      <strong>생년월일:</strong> {helper.birth}
                    </div>
                    <div className="Helper_one">
                      <strong>희망 일당:</strong> {helper.desiredPay}원
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
                          await fetchHelperTime(helper.id);
                        }}
                      >
                        신청하기
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

              <DatePicker
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(date) => {
                  setSelectedDate(date ? date.toDate() : null);
                }}
                disabledDate={(current) => {
                  // console.log("helperTime:", helperTime, current);

                  if (!current || !helperTime) return true;

                  const from = dayjs(helperTime.availableFrom);
                  const to = dayjs(helperTime.availableTo);

                  // console.log("from,to", from, to);
                  return (
                    current.isBefore(from, "day") || current.isAfter(to, "day")
                  );
                }}
                className="Helper_datePicker"
                placeholder="날짜 선택"
              />

              <div className="Helper_select_btn">
                <button
                  className="Ok_btn"
                  onClick={() => {
                    if (selectedDate) {
                      submitHelperRequest(activeHelper.id, selectedDate);
                    }
                  }}
                >
                  신청 확정
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
