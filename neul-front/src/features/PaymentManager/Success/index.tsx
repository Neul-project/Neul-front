import { useRouter } from "next/router";
import { PaymentSuccessStyled } from "./styled";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useCartStore } from "@/stores/useCartStore";

const PaymentSucessFeat = () => {
  const router = useRouter();
  const { orderId, amount, paymentKey } = router.query;

  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("결제성공, 주문정보: ", orderInfo);

  // 장바구니 개수 요청(결제완료된 건수 동기화)
  useEffect(() => {
    useCartStore.getState().fetchCartCount();
  }, []);

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

        setOrderInfo(res.data);
        setLoading(false);
      } catch (err) {
        console.error("결제 승인 실패:", err);
        // router.replace("/payment/fail");
      }
    };

    confirmPayment();
  }, [orderId, amount, paymentKey]);

  if (loading) return <div>결제 확인 중입니다...</div>;

  return (
    <PaymentSuccessStyled>
      <div className="Success_container padding">
        <div className="Success_firstBox">
          <div className="Success_title">결제가 완료되었습니다!</div>
          <p className="Success_orderNum">
            주문번호: <span>{orderInfo.orderId}</span>
          </p>

          <div className="Success_btnContainer">
            <div className="Success_goHome">
              <button
                onClick={() => {
                  router.push("/");
                }}
              >
                홈으로 가기
              </button>
            </div>
            <div className="Success_goDetail">
              <button
                onClick={() => {
                  router.push("/mypage?tab=program");
                }}
              >
                신청내역 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="Success_container">
        <div className="Success_orderInfo">주문정보</div>
        <div>
          {orderInfo.programs.map((p: any) => (
            <div key={p.id} className="Success_goods">
              <div>{p.name}</div>
              <div>{p.price.toLocaleString()}원</div>
            </div>
          ))}
        </div>
      </div>

      <div className="Success_container">
        <div className="Success_cont">
          <div>결제금액</div>
          <div>
            <span>{orderInfo.amount.toLocaleString()}</span>원
          </div>
        </div>
      </div>
    </PaymentSuccessStyled>
  );
};

export default PaymentSucessFeat;
