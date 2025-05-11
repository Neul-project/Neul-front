import { ProgramHistoryStyled, Cell, Btn } from "./styled";
import ModalCompo from "../ModalCompo";
import * as S from "@/components/ModalCompo/ModalContent";

import { useState } from "react";

const ProgramHistory = () => {
  const [refundOpen, setRefundOpen] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [bankName, setBankName] = useState("");
  const [refundReason, setRefundReason] = useState("");

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
    {
      id: 4,
      name: "청각장애인을 위한 명상과 호흡법",
      payment_status: "환불 완료",
      manager: "최승현",
      price: 45000,
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
                  <Btn
                    onClick={() => {
                      setRefundOpen(true);
                    }}
                  >
                    환불
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 환불 모달 */}
      {refundOpen && (
        <ModalCompo onClose={() => setRefundOpen(false)}>
          <S.ModalFormWrap
            onSubmit={(e) => {
              e.preventDefault();
              // 여기서 서버 전송 또는 상태 처리
              console.log({
                accountNumber,
                accountHolder,
                bankName,
                refundReason,
              });
            }}
          >
            <S.ModalTitle>환불정보 작성</S.ModalTitle>

            {/* 환불 계좌번호 */}
            <S.ModalInputDiv>
              <S.ModalCont>
                환불 계좌번호<span>*</span>
              </S.ModalCont>
              <S.ModalInput
                type="text"
                name="accountNumber"
                placeholder="환불 계좌번호를 입력해주세요"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </S.ModalInputDiv>

            <div className="flex">
              {/* 예금자명 */}
              <S.ModalInputDiv>
                <S.ModalCont>
                  예금자명<span>*</span>
                </S.ModalCont>
                <S.ModalInput
                  type="text"
                  name="accountHolder"
                  placeholder="예금자명을 입력해주세요"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </S.ModalInputDiv>

              {/* 은행명 */}
              <S.ModalInputDiv>
                <S.ModalCont>
                  은행명<span>*</span>
                </S.ModalCont>
                <S.ModalSelect
                  name="bankName"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value="">은행을 선택해주세요</option>
                  <option value="국민은행">국민은행</option>
                  <option value="신한은행">신한은행</option>
                  <option value="우리은행">우리은행</option>
                  <option value="하나은행">하나은행</option>
                  <option value="농협은행">농협은행</option>
                </S.ModalSelect>
              </S.ModalInputDiv>
            </div>

            {/* 환불사유 */}
            <S.ModalInputDiv>
              <S.ModalCont>
                환불 사유<span>*</span>
              </S.ModalCont>
              <S.ModalTextarea
                name="refundReason"
                placeholder="환불 사유를 입력해주세요"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </S.ModalInputDiv>

            <div className="MyInfo_CngPWSub">
              <S.ModalButton type="submit">환불신청</S.ModalButton>
            </div>
          </S.ModalFormWrap>
        </ModalCompo>
      )}
    </ProgramHistoryStyled>
  );
};

export default ProgramHistory;
