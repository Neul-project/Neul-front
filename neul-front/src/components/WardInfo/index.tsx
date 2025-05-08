import { WardInfoStyled } from "./styled";

const WardInfo = () => {
  return (
    <WardInfoStyled>
      <div className="MyInfo_container">
        <div className="MyInfo_flex">
          <div className="MyInfo_cont">
            <div className="MyInfo_name">
              <span>홍길동</span>님
            </div>
            <div className="MyInfo_email">abcd@abcd.com</div>
          </div>

          <div className="MyInfo_changePw">
            <button type="button">비밀번호 변경</button>
          </div>
        </div>

        <div className="MyInfo_phone">
          <div className="title">휴대전화번호</div>
          <div className="phone">010-1111-1111</div>
        </div>

        <div className="MyInfo_flex MyInfo_address">
          <div>주소 관리</div>
          <div className="MyInfo_changePw">
            <button type="button">주소 등록</button>
          </div>
        </div>
      </div>
    </WardInfoStyled>
  );
};

export default WardInfo;
