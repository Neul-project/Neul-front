import { useRouter } from "next/router";
import { PaymentSuccessStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

const PaymentSucessFeat = () => {
  const router = useRouter();
  const { orderId, amount, paymentKey } = router.query;

  // const [orderInfo, setOrderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 주문완료 데이터(임시)
  const orderInfo = {
    orderId: "order_20240515_xyz",
    amount: 35000,
    programs: [
      { id: 1, name: "미술치료", price: 18000 },
      { id: 2, name: "언어치료", price: 17000 },
    ],
  };

  // 최종 결제승인 요청
  useEffect(() => {
    // 쿼리 다 로드되기 전이면 아무것도 하지 않음
    if (!orderId || !amount || !paymentKey) return;

    const confirmPayment = async () => {
      try {
        // 1. 백엔드에 결제 승인 요청
        const res = await axiosInstance.post("/program/confirm", {
          orderId,
          amount,
          paymentKey,
        });

        // 2. 응답 받은 주문 정보 저장
        // {
        //   orderId: "order_20240515_xyz",
        //   amount: 35000,
        //   programs: [
        //     { id: 1, name: "미술치료", price: 18000 },
        //     { id: 2, name: "언어치료", price: 17000 },
        //   ],
        // }
        console.log("결제성공 주문정보", res.data);

        // setOrderInfo(res.data);
        setLoading(false);
      } catch (err) {
        console.error("결제 승인 실패:", err);
        // router.replace("/payment/fail");
      }
    };

    confirmPayment();
  }, [orderId, amount, paymentKey]);

  // if (loading) return <div>결제 확인 중입니다...</div>;

  return (
    <PaymentSuccessStyled>
      <div>결제가 완료되었습니다!</div>
      <p>주문번호: {orderInfo.orderId}</p>
      <p>결제금액: {orderInfo.amount.toLocaleString()}원</p>
      <h3>주문한 프로그램</h3>
      <ul>
        {orderInfo.programs.map((p: any) => (
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </PaymentSuccessStyled>
  );
};

export default PaymentSucessFeat;
