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
import { truncate } from "fs";

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
                      <button>신청하기</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </HelperStyled>
  );
};

export default HelperFeat;
