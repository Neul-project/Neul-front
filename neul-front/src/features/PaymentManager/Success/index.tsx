import { useRouter } from "next/router";
import { PaymentSuccessStyled } from "./styled";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";

const PaymentSucessFeat = () => {
  const router = useRouter();
  const { orderId, amount, paymentKey } = router.query;

  // 최종 결제승인 요청
  // useEffect(() => {
  //   // 쿼리 다 로드되기 전이면 아무것도 하지 않음
  //   if (!orderId || !amount || !paymentKey) return;

  //   const confirmPayment = async () => {
  //     try {
  //       // 1. 백엔드에 결제 승인 요청
  //       const res = await axiosInstance.post("/payments/confirm", {
  //         orderId,
  //         amount,
  //         paymentKey,
  //       });

  //       // 2. 응답 받은 주문 정보 저장
  //       console.log("결제성공 주문정보", res.data);
  //     } catch (err) {
  //       console.error("결제 승인 실패:", err);
  //       // router.replace("/payment/fail");
  //     }
  //   };

  //   confirmPayment();
  // }, [orderId, amount, paymentKey]);

  return (
    <PaymentSuccessStyled>
      <div>결제 성공 페이지임</div>
      <div>주문번호</div>
      <div>결제금액</div>
    </PaymentSuccessStyled>
  );
};

export default PaymentSucessFeat;
