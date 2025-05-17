import { useRouter } from "next/router";
import { PaymentFailStyled } from "./styled";

const PaymentFailFeat = () => {
  const router = useRouter();

  return (
    <PaymentFailStyled>
      <div className="Fail_container">
        <div className="Fail_X">
          <i className="fa-solid fa-xmark"></i>
        </div>

        <div className="Fail_title">결제 실패</div>
        <div>결제 중 오류가 발생했습니다.</div>
        <div>결제를 다시 시도하세요.</div>

        <div className="Fail_btn">
          <button
            onClick={() => {
              router.push("/");
            }}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </PaymentFailStyled>
  );
};

export default PaymentFailFeat;
