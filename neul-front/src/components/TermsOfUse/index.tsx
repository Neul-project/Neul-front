import { useState } from "react";
import { TermsOfUseStyled } from "./styled";
import { useRouter } from "next/router";
import axios from "axios";

// 이용약관 컴포넌트
const TermsOfUse = () => {
  const router = useRouter();

  // 사용자 동의여부 관리
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  // 전체 동의 여부
  const allChecked = Object.values(agreements).every(Boolean);

  // 필수 항목 확인
  const isRequiredChecked = agreements.terms && agreements.privacy;

  const handleAllToggle = () => {
    const newValue = !allChecked;
    const updated = {
      terms: newValue,
      privacy: newValue,
      location: newValue,
      marketing: newValue,
    };
    setAgreements(updated);
    // onChange(updated);
  };

  // 개별 동의 여부
  const handleToggle = (key: string) => {
    const updated = {
      ...agreements,
      [key]: !agreements[key as keyof typeof agreements],
    };
    setAgreements(updated);
    // onChange(updated);
  };

  // 약관 동의 목록 api 요청
  const handleNextClick = async () => {
    if (!isRequiredChecked) return;

    const agreedTerms = Object.entries(agreements)
      .filter(([_, value]) => value)
      .map(([key]) => key); // ["terms", "privacy", ...]

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/agreements`,
        {
          term: agreedTerms,
        }
      );

      if (res.data?.ok) {
        router.push("/join");
      }
    } catch (error) {
      console.error("약관 동의 전송 실패:", error);
      alert("약관 동의 전송 중 오류가 발생했습니다.");
    }
  };

  return (
    <TermsOfUseStyled>
      <div>
        <h3 className="TermsOfUse_title">이용약관 동의</h3>
        <i className="fa-solid fa-check"></i>

        {/* 전체 동의 */}
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
            [필수] 이용약관에 동의합니다.
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
            [필수] 개인정보 수집 및 이용에 동의합니다.
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
            [선택] 위치정보 이용에 동의합니다.
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
            [선택] 마케팅 정보 수신에 동의합니다.
          </label>
          <p className="TermsOfUse_content">
            이벤트, 할인 정보 등을 이메일이나 문자로 받아볼 수 있습니다.
          </p>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="TermsOfUse_nextBtn">
        <button disabled={!isRequiredChecked} onClick={handleNextClick}>
          다음
        </button>
      </div>
    </TermsOfUseStyled>
  );
};

export default TermsOfUse;
