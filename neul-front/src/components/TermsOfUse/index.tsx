import { useEffect, useState } from "react";
import { TermsOfUseStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";

interface Agreements {
  terms: boolean;
  privacy: boolean;
  location: boolean;
  marketing: boolean;
}

interface Props {
  onChange: (agreements: Agreements) => void;
}

// 이용약관 컴포넌트
const TermsOfUse = ({ onChange }: Props) => {
  const router = useRouter();

  // 사용자 동의여부 관리
  const [agreements, setAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  // 전체 동의 여부
  const allChecked = Object.values(agreements).every(Boolean);

  // 상태가 변경될 때마다 상위로 전달
  useEffect(() => {
    onChange(agreements);
  }, [agreements, onChange]);

  const handleAllToggle = () => {
    const newValue = !allChecked;
    const updated = {
      terms: newValue,
      privacy: newValue,
      location: newValue,
      marketing: newValue,
    };
    setAgreements(updated);
  };

  // 개별 동의 여부
  const handleToggle = (key: string) => {
    const updated = {
      ...agreements,
      [key]: !agreements[key as keyof typeof agreements],
    };
    setAgreements(updated);
  };

  return (
    <TermsOfUseStyled>
      <div className="TermsOfUse_container">
        <div className="TermsOfUse_title">
          <label className="MoreInfo_label">
            이용약관 동의<span className="MoreInfo_essential">*</span>
          </label>

          <div className="aaa">
            <i className="fa-solid fa-check"></i>
          </div>
        </div>

        {/* 전체 동의 */}
        <div className="TermsOfUse_agreements">
          <div className="TermsOfUse_checkOne">
            <label className="TermsOfUse_FullAgreement TermsOfUse_label">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleAllToggle}
                className="TermsOfUse_input"
              />
              전체 동의
            </label>
            <div className="TermsOfUse_content">
              실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택),
              이벤트・혜택 정보 수신(선택) 동의를 포함합니다.
            </div>
          </div>

          {/* 개별 항목 */}
          <div className="TermsOfUse_checkOne">
            <label className="TermsOfUse_label">
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={() => handleToggle("terms")}
                className="TermsOfUse_input"
              />
              <span className="TermsOfUse_span required">[필수]</span> 이용약관
              동의
            </label>
            <p className="TermsOfUse_content">
              서비스 이용에 필요한 기본적인 권리 및 의무가 정의되어 있습니다.
            </p>
          </div>

          <div className="TermsOfUse_checkOne">
            <label className="TermsOfUse_label">
              <input
                type="checkbox"
                checked={agreements.privacy}
                onChange={() => handleToggle("privacy")}
                className="TermsOfUse_input"
              />
              <span className="TermsOfUse_span required">[필수]</span> 개인정보
              수집∙이용 동의
            </label>
            <p className="TermsOfUse_content">
              회원 식별, 문의 대응 등을 위해 이메일 등 정보를 수집·이용합니다.
            </p>
          </div>

          <div className="TermsOfUse_checkOne">
            <label className="TermsOfUse_label">
              <input
                type="checkbox"
                checked={agreements.location}
                onChange={() => handleToggle("location")}
                className="TermsOfUse_input"
              />
              <span className="TermsOfUse_span">[선택]</span> 위치정보 이용 동의
            </label>
            <p className="TermsOfUse_content">
              위치 기반 추천, 주변 정보 제공 등 기능에 활용됩니다.
            </p>
          </div>

          <div className="TermsOfUse_checkOne">
            <label className="TermsOfUse_label">
              <input
                type="checkbox"
                checked={agreements.marketing}
                onChange={() => handleToggle("marketing")}
                className="TermsOfUse_input"
              />
              <span className="TermsOfUse_span">[선택]</span> 마케팅 정보 수신
              동의
            </label>
            <p className="TermsOfUse_content">
              이벤트, 할인 정보 등을 이메일이나 문자로 받아볼 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </TermsOfUseStyled>
  );
};

export default TermsOfUse;
