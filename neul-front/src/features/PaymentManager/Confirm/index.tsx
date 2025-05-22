import { useEffect, useState } from "react";
import { ComfirmStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

// 도우미 최종 결제완료 페이지
const PaymentConfirmFeat = () => {
  const router = useRouter();

  const { helperId, orderId, amount, paymentKey } = router.query;

  // 최종 결제승인 요청
  useEffect(() => {
    // 쿼리 다 로드되기 전이면 아무것도 하지 않음
    if (!helperId || !orderId || !amount || !paymentKey) return;

    const confirmPayment = async () => {
      try {
        // 1. 백엔드에 결제 승인 요청
        const res = await axiosInstance.post("/matching/confirm", {
          helperId,
          orderId,
          paymentKey,
        });

        console.log("도우미 최종결제 완료", res.data);

        if (res.data.ok) {
          alert("도우미 신청 결제가 완료되었습니다!");
        }
      } catch (err) {
        console.error("도우미 결제 승인 실패:", err);
      }
    };

    confirmPayment();
  }, [helperId, orderId, amount, paymentKey]);

  return (
    <ComfirmStyled>
      <div className="Confirm_container">
        <div className="Confirm_title">도우미 신청 결제성공!</div>

        <div className="Confirm_content">
          도우미 매칭이 완료되었습니다.
          <br />
          매칭이 완료된 도우미와 <strong>채팅</strong>을 이용하실 수 있습니다.
        </div>

        <div className="Confirm_btn">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </ComfirmStyled>
  );
};

export default PaymentConfirmFeat;
