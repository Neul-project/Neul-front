import { JoinStyled } from "./styled";
import { MoreInfoStyled } from "../MoreInfo/styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// 이미지 최적화
import Image from "next/image";
import Logo from "@/assets/images/logo_small.png";

import { Select } from "antd";
import { useFormik } from "formik";

// 회원가입 유효성 검사 yup
import { joinValidationSchema } from "@/utils/joinValidation";
import axios from "axios";

import TermsOfUse from "@/components/TermsOfUse";

// 회원가입 페이지
const JoinPage = () => {
  const router = useRouter();

  // 중복 확인 여부
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);

  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    location: false,
    marketing: false,
  });

  const option = [
    { value: "user", label: "일반사용자" },
    { value: "admin", label: "도우미" },
  ];

  // 이메일, 전화번호 중복 검사
  const handleDuplicationCheck = async (
    fieldName: string,
    fieldValue: string
  ) => {
    if (!fieldName || !fieldValue) {
      alert("값을 입력해주세요.");
      return;
    }

    try {
      let response;

      if (fieldName === "email") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check?email=${fieldValue}`
        );
        if (response.data.isDuplicate) {
          alert("이미 사용 중인 이메일입니다.");
        } else {
          alert("사용 가능한 이메일입니다.");
          setIsEmailChecked(true);
        }
      } else if (fieldName === "phone") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/check?phone=${fieldValue}`
        );
        if (response.data.isDuplicate) {
          alert("이미 등록된 전화번호입니다.");
        } else {
          alert("사용 가능한 전화번호입니다.");
          setIsPhoneChecked(true);
        }
      }
    } catch (error) {
      console.error("중복 확인 오류", error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 회원가입 api요청
  const formik = useFormik({
    initialValues: {
      email: "",
      adminEmailPrefix: "",
      password: "",
      passwordCheck: "",
      name: "",
      phone: "",
      wardName: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      gender: "male",
      note: "",
      role: "user",
      // 도우미 전용 필드
      desiredPay: "", // 희망 일당
      experience: "", // 경력사항
      certificate: null, // 자격증 파일
      certificateName_01: "", // 자격증명
      certificateName_02: "",
      certificateName_03: "",
      profileImage: null, // 이미지 파일
    },
    validationSchema: joinValidationSchema,
    onSubmit: async (values) => {
      console.log("회원가입 데이터:", values);

      // 요청 전 관리자 이메일 값 구성
      const emailToSend =
        values.role === "admin"
          ? `${values.adminEmailPrefix}@neul.com`
          : values.email;

      // 이용약관 필수 동의 항목 검사
      if (!agreements.terms || !agreements.privacy) {
        alert("필수 약관에 모두 동의해주세요.");
        return;
      }

      // 중복 검사 여부 체크
      if (!isEmailChecked) {
        alert("이메일 중복 확인을 완료해주세요.");
        return;
      }

      if (!isPhoneChecked) {
        alert("전화번호 중복 확인을 완료해주세요.");
        return;
      }

      try {
        // 1. 회원가입 유저 정보 저장
        const signupRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
          {
            email: emailToSend,
            password: values.password,
            name: values.name,
            phone: values.phone,
            role: values.role,
          }
        );

        // console.log("signupRes.data", signupRes.data);

        const userId = signupRes.data?.userId;
        if (!userId) {
          alert("회원가입 후 사용자 ID를 받아올 수 없습니다.");
          return;
        }

        // 2-1. 일반 사용자일 경우에만 피보호자 정보 요청 전송
        if (values.role === "user") {
          const wardRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/patient/signup`,
            {
              userId,
              name: values.wardName,
              gender: values.gender,
              birth: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
              note: values.note,
            }
          );
          // console.log("피보호자 정보 저장여부 확인", wardRes.data);
        }

        // 2-2. 도우미일 경우 상세정보 전송
        if (values.role === "admin") {
          // FormData 구성
          const formData = new FormData();
          formData.append("userId", String(userId));
          formData.append("desiredPay", values.desiredPay);
          formData.append("experience", values.experience);
          formData.append(
            "birth",
            `${values.birthYear}-${values.birthMonth}-${values.birthDay}`
          );
          formData.append("gender", values.gender);
          formData.append("certificateName_01", values.certificateName_01);
          formData.append(
            "certificateName_02",
            values.certificateName_02 || ""
          );
          formData.append(
            "certificateName_03",
            values.certificateName_03 || ""
          );

          // 파일 추가
          if (values.profileImage) {
            formData.append("profileImage", values.profileImage);
          }
          if (values.certificate) {
            formData.append("certificate", values.certificate);
          }

          for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }

          // 도우미 프로필 정보 전송
          const helperRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/helper/helper-signup`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("도우미 회원가입 응답", helperRes.data);
        }

        // 약관 동의 항목 추출
        const agreedTerms = Object.entries(agreements)
          .filter(([_, value]) => value)
          .map(([key]) => key); // ["terms", "privacy", ...]

        // 3. 약관 동의 전송
        const agreementsRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/agreements`,
          {
            userId,
            term: agreedTerms,
          }
        );

        if (agreementsRes.data?.ok) {
          if (values.role === "admin") {
            alert(
              "회원가입이 완료되었습니다.\n관리자의 최종 승인이 완료되면 서비스를 이용하실 수 있습니다."
            );
          } else {
            alert("회원가입이 완료되었습니다!");
          }
          router.push("/");
        } else {
          alert("약관 동의 처리 중 문제가 발생했습니다.");
        }
      } catch (error) {
        console.error("회원가입 실패", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
  });

  // 이메일,전화번호 값이 변경되면 중복확인 리셋
  useEffect(() => {
    setIsEmailChecked(false);
  }, [formik.values.email]);

  useEffect(() => {
    setIsPhoneChecked(false);
  }, [formik.values.phone]);

  return (
    <JoinStyled>
      <MoreInfoStyled>
        <div className="MoreInfo_container">
          <div className="MoreInfo_title">
            <div>회원가입</div>
          </div>
          <div className="MoreInfo_midTitle">
            <span className="MoreInfo_essential">*</span> 필수입력사항
          </div>

          <form onSubmit={formik.handleSubmit}>
            {/* 사용자 구분 */}
            <div className="Join_selectBox">
              <Select
                value={formik.values.role}
                options={option}
                onChange={(val) => {
                  formik.setFieldValue("role", val);

                  // 이메일 관련 필드 초기화
                  formik.setFieldValue("adminEmailPrefix", "");
                  formik.setFieldValue("email", "");

                  // 중복 확인 상태 초기화
                  setIsEmailChecked(false);
                }}
              />
            </div>

            {/* 보호자 정보 */}
            <div className="MoreInfo_section">
              <h4 className="MoreInfo_sectionTitle">
                {formik.values.role === "admin" ? "도우미 정보" : "보호자 정보"}
              </h4>

              <div className="MoreInfo_inputGroup">
                <label className="MoreInfo_label">
                  아이디<span className="MoreInfo_essential">*</span>
                </label>

                {/* 관리자용 이메일 입력 */}
                {formik.values.role === "admin" ? (
                  <div className="Join_width">
                    <input
                      type="text"
                      name="adminEmailPrefix"
                      className="MoreInfo_input"
                      value={formik.values.adminEmailPrefix || ""}
                      onChange={(e) =>
                        formik.setFieldValue("adminEmailPrefix", e.target.value)
                      }
                      placeholder="아이디를 입력해주세요"
                    />

                    <span className="Join_domain">@neul.com</span>

                    {formik.touched.adminEmailPrefix &&
                      formik.errors.adminEmailPrefix && (
                        <div className="Join_validation">
                          {formik.errors.adminEmailPrefix}
                        </div>
                      )}
                  </div>
                ) : (
                  // 일반 사용자용 이메일 입력
                  <div className="Join_width">
                    <input
                      type="email"
                      name="email"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="이메일을 입력해 주세요"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="Join_validation">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                )}

                <div className="MoreInfo_addressBtn">
                  <button
                    type="button"
                    onClick={() => {
                      const checkEmailValue =
                        formik.values.role === "admin"
                          ? `${formik.values.adminEmailPrefix}@neul.com`
                          : formik.values.email;

                      handleDuplicationCheck("email", checkEmailValue);
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </div>

              <div className="MoreInfo_inputGroup">
                <label className="MoreInfo_label">
                  비밀번호<span className="MoreInfo_essential">*</span>
                </label>
                <div className="Join_width">
                  <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해 주세요"
                    className="MoreInfo_input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="Join_validation">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="MoreInfo_inputGroup">
                <label className="MoreInfo_label">
                  비밀번호 확인<span className="MoreInfo_essential">*</span>
                </label>
                <div className="Join_width">
                  <input
                    type="password"
                    name="passwordCheck"
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    className="MoreInfo_input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordCheck}
                  />
                  {formik.touched.passwordCheck &&
                    formik.errors.passwordCheck && (
                      <div className="Join_validation">
                        {formik.errors.passwordCheck}
                      </div>
                    )}
                </div>
              </div>

              <div className="MoreInfo_inputGroup">
                <label className="MoreInfo_label">
                  이름<span className="MoreInfo_essential">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="이름을 입력해 주세요"
                    className="MoreInfo_input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="Join_validation">{formik.errors.name}</div>
                  )}
                </div>
              </div>

              <div className="MoreInfo_inputGroup">
                <label className="MoreInfo_label">
                  전화번호<span className="MoreInfo_essential">*</span>
                </label>
                <div className="Join_width">
                  <input
                    type="text"
                    name="phone"
                    className="MoreInfo_input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    placeholder="숫자만 입력해주세요"
                    maxLength={11}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="Join_validation">{formik.errors.phone}</div>
                  )}
                </div>
                <div className="MoreInfo_addressBtn">
                  <button
                    type="button"
                    onClick={() => {
                      handleDuplicationCheck("phone", formik.values.phone);
                    }}
                  >
                    중복확인
                  </button>
                </div>
              </div>
            </div>

            <hr />

            {/* 피보호자 정보 */}
            {formik.values.role === "user" && (
              <div className="MoreInfo_section">
                <h4 className="MoreInfo_sectionTitle border">피보호자 정보</h4>

                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    피보호자 이름<span className="MoreInfo_essential">*</span>
                  </label>
                  <div>
                    <input
                      type="text"
                      name="wardName"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.wardName}
                      placeholder="피보호자명을 입력해 주세요"
                    />
                    {formik.touched.wardName && formik.errors.wardName && (
                      <div className="Join_validation">
                        {formik.errors.wardName}
                      </div>
                    )}
                  </div>
                </div>

                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    생년월일<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="MoreInfo_birthInput">
                    <div className="Join_width">
                      <div className="MoreInfo_birth">
                        <input
                          type="text"
                          name="birthYear"
                          placeholder="YYYY"
                          className="MoreInfo_inputSmall"
                          value={formik.values.birthYear}
                          onChange={formik.handleChange}
                          maxLength={4}
                        />
                        <span>/</span>
                        <input
                          type="text"
                          name="birthMonth"
                          placeholder="MM"
                          className="MoreInfo_inputSmall"
                          value={formik.values.birthMonth}
                          onChange={formik.handleChange}
                          maxLength={2}
                        />
                        <span>/</span>
                        <input
                          type="text"
                          name="birthDay"
                          placeholder="DD"
                          className="MoreInfo_inputSmall"
                          value={formik.values.birthDay}
                          onChange={formik.handleChange}
                          maxLength={2}
                        />
                      </div>
                      {(formik.errors.birthYear ||
                        formik.errors.birthMonth ||
                        formik.errors.birthDay) && (
                        <div className="Join_validation">
                          생년월일을 올바르게 입력하세요
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    성별<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="MoreInfo_radioGroup">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formik.values.gender === "male"}
                        onChange={formik.handleChange}
                      />{" "}
                      남자
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={formik.handleChange}
                      />{" "}
                      여자
                    </label>
                  </div>
                </div>

                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">특이사항</label>
                  <div className="Join_width">
                    <textarea
                      name="note"
                      className="MoreInfo_textarea"
                      placeholder="특이사항이 있다면 작성해주세요"
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 도우미 정보 */}
            {formik.values.role === "admin" && (
              <>
                <h4 className="MoreInfo_sectionTitle">상세정보</h4>

                {/* 프로필 사진 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    프로필 사진<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "profileImage",
                          event.currentTarget.files?.[0]
                        )
                      }
                    />
                    {formik.touched.profileImage &&
                      formik.errors.profileImage && (
                        <div className="Join_validation">
                          {formik.errors.profileImage}
                        </div>
                      )}
                  </div>
                </div>

                {/* 자격증 파일 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    자격증 사본<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <input
                      type="file"
                      name="certificate"
                      accept=".pdf,image/*"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "certificate",
                          event.currentTarget.files?.[0]
                        )
                      }
                    />
                    {formik.touched.certificate &&
                      formik.errors.certificate && (
                        <div className="Join_validation">
                          {formik.errors.certificate}
                        </div>
                      )}
                  </div>
                </div>

                {/* 자격증 명 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    자격증 명<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <input
                      type="text"
                      name="certificateName_01"
                      placeholder="(필수) 자격증 이름을 입력하세요"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      value={formik.values.certificateName_01}
                    />
                    {formik.touched.certificateName_01 &&
                      formik.errors.certificateName_01 && (
                        <div className="Join_validation">
                          {formik.errors.certificateName_01}
                        </div>
                      )}
                  </div>
                </div>

                {/* 자격증 명02_선택 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">자격증 명_2</label>
                  <div className="Join_width">
                    <input
                      type="text"
                      name="certificateName_02"
                      placeholder="(선택) 자격증 이름을 입력하세요"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      value={formik.values.certificateName_02}
                    />
                  </div>
                </div>

                {/* 자격증 명03_선택 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">자격증 명_3</label>
                  <div className="Join_width">
                    <input
                      type="text"
                      name="certificateName_03"
                      placeholder="(선택) 자격증 이름을 입력하세요"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      value={formik.values.certificateName_03}
                    />
                  </div>
                </div>

                {/* 희망 일당 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    희망 일당<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <input
                      type="number"
                      name="desiredPay"
                      placeholder="숫자만 입력하세요"
                      className="MoreInfo_input"
                      onChange={formik.handleChange}
                      value={formik.values.desiredPay || ""}
                    />
                    {formik.touched.desiredPay && formik.errors.desiredPay && (
                      <div className="Join_validation">
                        {formik.errors.desiredPay}
                      </div>
                    )}
                  </div>
                </div>

                {/* 생년월일 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    생년월일<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <div className="MoreInfo_birth">
                      <input
                        type="text"
                        name="birthYear"
                        placeholder="YYYY"
                        className="MoreInfo_inputSmall"
                        maxLength={4}
                        value={formik.values.birthYear}
                        onChange={formik.handleChange}
                      />
                      <span>/</span>
                      <input
                        type="text"
                        name="birthMonth"
                        placeholder="MM"
                        className="MoreInfo_inputSmall"
                        maxLength={2}
                        value={formik.values.birthMonth}
                        onChange={formik.handleChange}
                      />
                      <span>/</span>
                      <input
                        type="text"
                        name="birthDay"
                        placeholder="DD"
                        className="MoreInfo_inputSmall"
                        maxLength={2}
                        value={formik.values.birthDay}
                        onChange={formik.handleChange}
                      />
                    </div>
                    {(formik.errors.birthYear ||
                      formik.errors.birthMonth ||
                      formik.errors.birthDay) && (
                      <div className="Join_validation">
                        생년월일을 올바르게 입력하세요
                      </div>
                    )}
                  </div>
                </div>

                {/* 성별 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    성별<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="MoreInfo_radioGroup">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formik.values.gender === "male"}
                        onChange={formik.handleChange}
                      />{" "}
                      남자
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formik.values.gender === "female"}
                        onChange={formik.handleChange}
                      />{" "}
                      여자
                    </label>
                  </div>
                </div>

                {/* 경력사항 */}
                <div className="MoreInfo_inputGroup">
                  <label className="MoreInfo_label">
                    경력사항<span className="MoreInfo_essential">*</span>
                  </label>
                  <div className="Join_width">
                    <textarea
                      name="experience"
                      className="MoreInfo_textarea"
                      placeholder="관련 경력을 입력하세요"
                      value={formik.values.experience || ""}
                      onChange={formik.handleChange}
                      rows={4}
                    />
                    {formik.touched.experience && formik.errors.experience && (
                      <div className="Join_validation">
                        {formik.errors.experience}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <hr />

            {/* 이용약관 동의 */}
            <TermsOfUse onChange={(updated) => setAgreements(updated)} />

            {/* 회원가입 버튼 */}
            <div className="MoreInfo_subBtn joinBtn">
              <button
                type="submit"
                onClick={() => {
                  console.log("formik.errors:", formik.errors);
                }}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </MoreInfoStyled>
    </JoinStyled>
  );
};

export default JoinPage;
