import { PaymentStyled } from "./styled";

const PaymentFeature = () => {
  return (
    <PaymentStyled>
      <div className="Payment_title">결제하기</div>

      <div className="Payment_container">
        {/* 왼쪽 */}
        <div className="Payment_leftContainer">
          {/* 프로그램 주문 정보 */}
          <div className="Program_info">
            <div className="title">프로그램 주문 정보</div>

            <div className="program_info_container">
              <div className="program_info_imgDiv">
                <img src="/cute_dog.jpg" alt="test" />
              </div>

              <div>
                <div className="p_name">발달장애 아동을 위한 감각통합 놀이</div>
                <div className="p_manager">강사명</div>
                <div className="p_price">18,000원</div>
              </div>
            </div>
          </div>

          {/* 주문자 정보 */}
          <div className="Orderer_info">
            <div className="title">주문자 정보</div>

            <div className="Orderder_info_container">
              <div className="O_orderer">홍길동</div>
              <div className="O_phone">010-1111-1111</div>
              <div className="O_email">test@email.com</div>
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="Payment_RightContainer">
          <div className="Total_amount">
            <div className="title">최종 결제금액</div>

            <div className="T_flex">
              <div className="T_column">상품가격</div>
              <div className="T_price">10,000원</div>
            </div>
            <div className="T_flex">
              <div className="T_column">할인</div>
              <div className="T_price">-1,000원</div>
            </div>

            <div className="hr" />

            <div className="T_amount T_flex">
              <div>총 결제금액</div>
              <div className="T_result">9,000원</div>
            </div>
          </div>

          <div className="Pay_method">
            <div className="title">결제 방법</div>

            <div>동의</div>
          </div>
          <div className="Pay_btn">
            <button>결제하기</button>
          </div>
        </div>
      </div>
    </PaymentStyled>
  );
};

export default PaymentFeature;
