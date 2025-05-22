import { useEffect, useState } from "react";
import { ComfirmStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

// 도우미 최종 결제완료 페이지
const PaymentConfirmFeat = () => {
  const router = useRouter();
  const { helperId, orderId, amount, paymentKey } = router.query;

  const [orderInfo, setOrderInfo] = useState<any>(null);

  console.log("도우미 결제성공: ", orderInfo);

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
        // router.replace("/payment/fail");
      }
    };

    confirmPayment();
  }, [helperId, orderId, amount, paymentKey]);

  return (
    <ComfirmStyled>
      <div>도우미 신청 결제 성공 페이지</div>
    </ComfirmStyled>
  );
};

export default PaymentConfirmFeat;
