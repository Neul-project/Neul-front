import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination } from "swiper/modules";

import { InfoCircleFilled } from "@ant-design/icons";

import { useState } from "react";
import { HelperStyled } from "./styled";
import Image from "next/image";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import axiosInstance from "@/lib/axios";
import { resolve } from "path/win32";

interface HelperInfo {
  id: number;
  name: string;
  gender: string;
  birth: string;
  profileImage: string;
  certificate: string; // 자격증 pdf파일
  desiredPay: string; // 희망 일당
  experience: string; // 경력사항
  certificateName_01: string;
  certificateName_02: string | null;
  certificateName_03: string | null;
}

interface HelperTime {
  availableFrom: string; // "2024-06-01"
  availableTo: string; // "2024-06-30"
}

const helpers: HelperInfo[] = [
  {
    id: 1,
    name: "김가나",
    profileImage: "/cute_cat.jpg",
    certificate: "/cert1.pdf",
    desiredPay: "100,000",
    experience: "5년간 재가활동보조",
    gender: "여성",
    birth: "1985-06-14",
    certificateName_01: "장애인활동지원사",
    certificateName_02: "사회복지사 1급",
    certificateName_03: null,
  },
  {
    id: 2,
    name: "박금자",
    profileImage: "/cute_dog.jpg",
    certificate: "/cert2.pdf",
    desiredPay: "90,000",
    experience: "3년 요양원 근무",
    gender: "남성",
    birth: "1980-01-25",
    certificateName_01: "사회복지사 2급",
    certificateName_02: "요양보호사",
    certificateName_03: "장애인활동지원사",
  },
  {
    id: 3,
    name: "이세인",
    profileImage: "/cute_pup.jpg",
    certificate: "/cert3.pdf",
    desiredPay: "85,000",
    experience: "장애인 돌봄 경험 있음",
    gender: "여성",
    birth: "1990-09-01",
    certificateName_01: "요양보호사",
    certificateName_02: null,
    certificateName_03: null,
  },
];

const HelperFeat = () => {
  const [activeHelper, setActiveHelper] = useState<HelperInfo | null>(null);
  const [helperTime, setHelperTime] = useState<HelperTime | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loadingTime, setLoadingTime] = useState(false);

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

  // 날짜 최종신청 요청
  const submitHelperRequest = async (
    helperId: number,
    selectedDate: Date
  ): Promise<void> => {
    try {
      const res = await axiosInstance.post("/submit-helper-request", {
        helperId,
        date: selectedDate.toISOString().split("T")[0], // "YYYY-MM-DD" 형식
      });

      console.log("도우미 신청 결과:", res.data);

      // alert("신청이 완료되었습니다!");
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
                    src={helper.profileImage}
                    alt={helper.name}
                    width={250}
                    height={250}
                  />
                  <div className="Helper_content">
                    <div className="Helper_one">
                      <strong>이름:</strong> {helper.name}
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
                      <strong>자격증:</strong> {helper.certificateName_01}
                    </div>
                    <div className="Helper_one">
                      {helper.certificateName_02 && (
                        <>
                          <strong>자격증2:</strong> {helper.certificateName_02}
                        </>
                      )}
                    </div>
                    <div className="Helper_one">
                      {helper.certificateName_03 && (
                        <>
                          <strong>자격증3:</strong> {helper.certificateName_03}
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
                <strong>{activeHelper.name}</strong> 도우미 예약일 선택
              </div>

              <DatePicker
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(date) => {
                  setSelectedDate(date ? date.toDate() : null);
                }}
                disabledDate={(current) => {
                  console.log("helperTime:", helperTime, current);

                  if (!current || !helperTime) return true;

                  const from = dayjs(helperTime.availableFrom);
                  const to = dayjs(helperTime.availableTo);

                  console.log("from,to", from, to);
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
                    console.log("신청 날짜:", selectedDate);

                    if (!activeHelper || !selectedDate) {
                      alert("도우미와 날짜를 선택해주세요.");
                      return;
                    }

                    // 초기화
                    setActiveHelper(null);
                    setHelperTime(null);
                    setSelectedDate(null);
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
