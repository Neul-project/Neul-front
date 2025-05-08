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

  // 테이블 헤더
  const headerLabels = ["번호", "프로그램명", "결제 상태", "환불"];
  const flexValues = [1, 1.5, 1, 1];

  return (
    <ProgramHistoryStyled>
      <div className="ProgramHistory_title">프로그램 신청내역</div>

      <div className="Table_container">
        {/* 테이블 헤더 */}
        <div className="Table_header etc">
          {headerLabels.map((label, i) => (
            <Cell key={i} $flex={flexValues[i]}>
              {label}
            </Cell>
          ))}
        </div>

        {/* 테이블 내용 */}
        {datas.map((data, rowIdx) => (
          <div className="Table_header" key={rowIdx}>
            {[data.id, data.programName, data.paymentStatus, "환불"].map(
              (cell, colIdx) => (
                <Cell key={colIdx} $flex={flexValues[colIdx]}>
                  {colIdx === 3 ? <Btn>{cell}</Btn> : cell}
                </Cell>
              )
            )}
          </div>
        ))}
      </div>
    </ProgramHistoryStyled>
  );
};

export default ProgramHistory;
