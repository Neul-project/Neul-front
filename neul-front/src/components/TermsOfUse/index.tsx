import { useState } from "react";
import { TermsOfUseStyled } from "./styled";

interface Props {
  onChange: (agreements: { [key: string]: boolean }) => void;
}

const TermsOfUse = ({ onChange }: Props) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  const handleToggle = (key: string) => {
    const updated = {
      ...agreements,
      [key]: !agreements[key as keyof typeof agreements],
    };
    setAgreements(updated);
    onChange(updated);
  };

  return (
    <TermsOfUseStyled>
      <div>
        <h2>이용약관 동의</h2>
        <i className="fa-solid fa-check"></i>

        <div>
          <label>
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={() => handleToggle("terms")}
            />
            [필수] 이용약관에 동의합니다.
          </label>
          <p>서비스 이용에 필요한 기본적인 권리 및 의무가 정의되어 있습니다.</p>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={agreements.privacy}
              onChange={() => handleToggle("privacy")}
            />
            [필수] 개인정보 수집 및 이용에 동의합니다.
          </label>
          <p>
            회원 식별, 문의 대응 등을 위해 이메일 등 정보를 수집·이용합니다.
          </p>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={agreements.location}
              onChange={() => handleToggle("location")}
            />
            [선택] 위치정보 이용에 동의합니다.
          </label>
          <p>위치 기반 추천, 주변 정보 제공 등 기능에 활용됩니다.</p>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={agreements.marketing}
              onChange={() => handleToggle("marketing")}
            />
            [선택] 마케팅 정보 수신에 동의합니다.
          </label>
          <p>이벤트, 할인 정보 등을 이메일이나 문자로 받아볼 수 있습니다.</p>
        </div>
      </div>
    </TermsOfUseStyled>
  );
};

export default TermsOfUse;
