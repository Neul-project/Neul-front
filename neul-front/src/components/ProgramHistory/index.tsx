import { ProgramHistoryStyled, Cell, Btn } from "./styled";

const ProgramHistory = () => {
  // 테이블 내용(임시)
  const datas = [
    {
      id: 1,
      programName: "스트레스 관리 심화반",
      paymentStatus: "결제 완료",
      refundStatus: "없음",
    },
    {
      id: 2,
      programName: "우울 예방 마인드풀니스",
      paymentStatus: "환불 요청 중",
      refundStatus: "요청 중",
    },
    {
      id: 3,
      programName: "불안 해소 요가 클래스",
      paymentStatus: "결제 완료",
      refundStatus: "해당 없음",
    },
  ];

  return (
    <ProgramHistoryStyled>
      <div className="ProgramHistory_container">
        <div className="ProgramHistory_title">프로그램 신청내역</div>

        {/* 프로그램 목록 */}
        <div className="ProgramHistory_item_container">
          <div className="ProgramHistory_item_box">
            <div className="ProgramHistory_semicircle"></div>

            <div className="ProgramHistory_content_wrap">
              {/* <div className="ProgramHistory_number">1</div> */}

              <div className="ProgramHistory_content">
                <div className="p_name">프로그램명</div>
                <div className="payment">결제완료</div>
              </div>

              <div>
                <div className="manager">강사명</div>
              </div>

              <div className="ProgramHistory_content">
                <div className="price">10,000원</div>
              </div>

              <div className="ProgramHistory_content flex-end">
                <Btn>환불</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProgramHistoryStyled>
  );
};

export default ProgramHistory;
