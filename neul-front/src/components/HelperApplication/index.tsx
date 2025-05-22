import { useEffect, useState } from "react";
import { HelperAppStyled } from "./styled";
import axiosInstance from "@/lib/axios";

import { loadTossPayments } from "@tosspayments/payment-sdk";

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
  apply_status: string;
  apply_dates: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    created_at: string;
    password: string;
    provider: "local" | string;
    role: "admin" | "user" | string;
  };
}

// 도우미 신청내역(사용자)
const HelperApplication = () => {
  // 신청한 도우미 리스트
  const [helpers, setHelpers] = useState<HelperInfo[]>([]);

  // const dummyHelpers: HelperInfo[] = [
  //   {
  //     id: 1,
  //     gender: "female",
  //     birth: "1990-06-15",
  //     profileImage: "profile1.jpg",
  //     certificate: "cert1.pdf",
  //     desiredPay: 120000,
  //     experience: "노인 요양보호사 경력 3년",
  //     certificateName: "요양보호사 1급",
  //     certificateName2: null,
  //     certificateName3: null,
  //     status: "승인 대기",
  //     dates: "2025-06-25,2025-06-26,2025-06-27",
  //     user: {
  //       id: 101,
  //       name: "김영희",
  //       email: "younghee@example.com",
  //       phone: "01012345678",
  //       address: "서울특별시 강남구",
  //       created_at: "2024-12-01T10:30:00Z",
  //       password: "hashed_password_1",
  //       provider: "local",
  //       role: "user",
  //     },
  //   },
  //   {
  //     id: 2,
  //     gender: "male",
  //     birth: "1985-03-22",
  //     profileImage: "profile2.jpg",
  //     certificate: "cert2.pdf",
  //     desiredPay: 100000,
  //     experience: "장애인 활동보조 경력 5년",
  //     certificateName: "사회복지사 2급",
  //     certificateName2: "장애인활동지원사",
  //     certificateName3: null,
  //     status: "결제 완료",
  //     dates: "2025-06-25,2025-06-26,2025-06-27",
  //     user: {
  //       id: 102,
  //       name: "이철수",
  //       email: "chulsoo@example.com",
  //       phone: "01023456789",
  //       address: "경기도 성남시 분당구",
  //       created_at: "2024-10-20T14:15:00Z",
  //       password: "hashed_password_2",
  //       provider: "local",
  //       role: "user",
  //     },
  //   },
  //   {
  //     id: 3,
  //     gender: "female",
  //     birth: "1995-12-05",
  //     profileImage: "profile3.jpg",
  //     certificate: "cert3.pdf",
  //     desiredPay: 110000,
  //     experience: "요양보호 및 가사도우미 경력 2년",
  //     certificateName: "요양보호사 2급",
  //     certificateName2: "가사관리사 자격증",
  //     certificateName3: "심리상담사 1급",
  //     status: "결제 대기",
  //     dates: "2025-06-25,2025-06-26,2025-06-27",
  //     user: {
  //       id: 103,
  //       name: "더미데이터 도우미명",
  //       email: "minjung@example.com",
  //       phone: "01034567890",
  //       address: "부산광역시 해운대구",
  //       created_at: "2025-01-10T09:00:00Z",
  //       password: "hashed_password_3",
  //       provider: "local",
  //       role: "user",
  //     },
  //   },
  // ];

  // 신청한 도우미 리스트 요청
  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const res = await axiosInstance.get("matching/myapplication-list");
        console.log("신청한 도우미 리스트 응답", res.data);

        setHelpers(res.data);
      } catch (error) {
        console.error("신청한 도우미 목록 불러오기 실패:", error);
      }
    };
    fetchHelpers();
  }, []);

  // 도우미 신청 - 토스 결제
  const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  const handlePayment = async (amount: number, helperId: number) => {
    console.log("도우미 신청결제: ", amount, helperId);

    if (!tossClientKey) {
      console.error("Toss client key가 없습니다.");
      return;
    }

    try {
      const orderId = `order-${Date.now()}`;
      const orderName = "도우미 신청 결제";

      // 서버에 결제내역 전송
      const res = await axiosInstance.post("/matching/create-payment", {
        amount,
        helperId: helperId,
        orderId,
      });

      // 2. 받은 orderId로 토스 결제창 띄우기
      const tossPayments = await loadTossPayments(tossClientKey);

      await tossPayments.requestPayment({
        amount,
        orderId,
        orderName,
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/confirm`,
        failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
    }
  };

  return (
    <HelperAppStyled>
      <div className="HelperApp_container">
        <div className="HelperApp_title">도우미 신청내역</div>

        {helpers.map((helper) => (
          <div className="HelperApp_Content" key={helper.id}>
            <h3>
              {helper.user.name} - {helper.apply_status}
            </h3>
            <p>희망 일당: {helper.desiredPay.toLocaleString()}원</p>
            <p>경력: {helper.experience}</p>

            {helper.apply_status == "결제 대기" && (
              <div className="HelperApp_btn">
                <button
                  onClick={() => {
                    // (희망 일당 * 사용자가 신청한 일수) 계산
                    const applyDates = helper.apply_dates;
                    const dateArray = applyDates.split(",");
                    const dateCount = dateArray.length;

                    const desiredPay = helper?.desiredPay ?? 0;
                    const totalAmount = desiredPay * dateCount;

                    handlePayment(totalAmount, helper.user.id);
                  }}
                >
                  결제
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </HelperAppStyled>
  );
};

export default HelperApplication;
