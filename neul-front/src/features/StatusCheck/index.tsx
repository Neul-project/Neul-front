import { DatePicker } from "antd";
import { StatusCheckStyled } from "./styled";

const StatusCheck = () => {
  const userId = 1; //임의로 사용자 id설정
  // userId를 보내면 피보호자의 이름과 상태 기록 받기

  return (
    <StatusCheckStyled>
      <div></div>
      <div>000님 상태</div>
      <div>
        <DatePicker size="large" />
      </div>
    </StatusCheckStyled>
  );
};

export default StatusCheck;
