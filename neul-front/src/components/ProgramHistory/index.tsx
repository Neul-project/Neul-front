import { ProgramHistoryStyled, Cell, Btn } from "./styled";

const ProgramHistory = () => {
  // 데이터(임시)
  const datas = [
    {
      id: 1,
      name: "발달장애 아동을 위한 감각통합 놀이",
      payment_status: "결제 완료",
      manager: "김지현",
      price: 10000,
    },
    {
      id: 2,
      name: "지체장애인을 위한 맞춤 요가 클래스",
      payment_status: "환불 요청 중",
      manager: "박정우",
      price: 12000,
    },
    {
      id: 3,
      name: "시각장애인을 위한 명상과 호흡법",
      payment_status: "결제 완료",
      manager: "이서윤",
      price: 15000,
    },
  ];

  return (
    <ProgramHistoryStyled>
      <div className="ProgramHistory_container">
        <div className="ProgramHistory_title">프로그램 신청내역</div>

        {/* 프로그램 목록 */}
        <div className="ProgramHistory_item_container">
          {datas.map((data) => (
            <div className="ProgramHistory_item_box" key={data.id}>
              <div className="ProgramHistory_semicircle"></div>

              <div className="ProgramHistory_content_wrap">
                {/* <div className="ProgramHistory_number">1</div> */}

                <div className="ProgramHistory_content">
                  <div className="p_name">{data.name}</div>
                  <div className="payment">{data.payment_status}</div>
                </div>

                <div>
                  <div className="manager">{data.manager}</div>
                </div>

                <div className="ProgramHistory_content">
                  <div className="price">{data.price.toLocaleString()}원</div>
                </div>

                <div className="ProgramHistory_content flex-end">
                  <Btn>환불</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProgramHistoryStyled>
  );
};

export default ProgramHistory;
