import { useEffect, useState } from "react";
import { ComfirmStyled } from "./styled";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import dayjs from "dayjs";

type ConfirmType = {
  adminName: string;
  charge: {
    created_at: string;
    orderId: string;
    price: number;
  };
  dates: string;
  userName: string;
};

// 도우미 최종 결제완료 페이지
const PaymentConfirmFeat = () => {
  const router = useRouter();
  const { applyId, helperId, orderId, amount, paymentKey } = router.query;
  const [data, setData] = useState<ConfirmType | null>(null);

  console.log("도우미 최종결제 완료", data);

  // 최종 결제승인 요청
  useEffect(() => {
    // 쿼리 다 로드되기 전이면 아무것도 하지 않음
    if (!applyId || !helperId || !orderId || !amount || !paymentKey) return;

    const confirmPayment = async () => {
      try {
        // 1. 백엔드에 결제 승인 요청
        const res = await axiosInstance.post("/matching/confirm", {
          helperId,
          orderId,
          paymentKey,
          applyId,
        });

        setData(res.data);
      } catch (err) {
        console.error("도우미 결제 승인 실패:", err);
      }
    };

    confirmPayment();
  }, [applyId, helperId, orderId, amount, paymentKey]);

  return (
    <ComfirmStyled>
      <div className="Confirm_container">
        <div className="Confirm_title">도우미 신청 결제성공!</div>

        <div className="Confirm_content">
          <div className="content">
            <div className="name">신청자:</div>
            <div>{data?.userName}</div>
          </div>
          <div className="content">
            <div className="name">담당 도우미:</div>
            <div>{data?.adminName}</div>
          </div>
          <div className="content">
            <div className="name">승인번호:</div>{" "}
            <div>{data?.charge.orderId}</div>
          </div>

          <div className="content">
            <div className="name">승인일시:</div>{" "}
            <div>
              {dayjs(data?.charge.created_at).format("YYYY.MM.DD HH:mm:ss")}
            </div>
          </div>

          <div className="content">
            <div className="name">예약 날짜:</div>
            <div>
              {data?.dates.split(",").map((date, idx) => (
                <div key={idx}>{date}</div>
              ))}
            </div>
          </div>

          <div className="content amount">
            <div className="name">결제 금액:</div>{" "}
            <div>
              <span className="pay">{data?.charge.price.toLocaleString()}</span>
              원
            </div>
          </div>
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
