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
    name: "김도우미",
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
    name: "박도우미",
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
    name: "이도우미",
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

  console.log(helperTime);

  // 해당 도우미의 일정 불러오기
  const fetchHelperTime = async (helperId: number) => {
    setLoadingTime(true);
    try {
      // 예: 실제 API 요청
      // const res = await fetch(`/api/helper-time/${helperId}`);
      // const data: HelperTime = await res.json();

      // 더미 테스트용
      const data: HelperTime = {
        availableFrom: "2024-05-10",
        availableTo: "2024-06-25",
      };

      setHelperTime(data);
    } catch (error) {
      console.error("근무 가능 날짜 불러오기 실패:", error);
      setHelperTime(null);
    } finally {
      setLoadingTime(false);
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
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
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
                    width={200}
                    height={200}
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
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>{activeHelper.name} 도우미 방문 날짜 선택</h3>

              <DatePicker
                value={selectedDate ? dayjs(selectedDate) : null}
                onChange={(date) => {
                  setSelectedDate(date ? date.toDate() : null);
                }}
                disabledDate={(current) => {
                  if (!current || !helperTime) return true;

                  const from = dayjs(helperTime.availableFrom, "YYYY-MM-DD");
                  const to = dayjs(helperTime.availableTo, "YYYY-MM-DD");

                  return (
                    current.isBefore(from, "day") || current.isAfter(to, "day")
                  );
                }}
                style={{ width: "100%" }}
                placeholder="날짜 선택"
              />

              <button
                onClick={() => {
                  console.log("신청 날짜:", selectedDate);
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
        )}
      </div>
    </HelperStyled>
  );
};

export default HelperFeat;
