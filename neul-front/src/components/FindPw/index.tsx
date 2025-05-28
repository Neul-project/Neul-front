import axios from "axios";
import { FindPwStyled } from "./styled";

import { useFormik } from "formik";
import {
  findPwValidationSchema,
  changePwValidation,
} from "@/utils/userValidation";

import { useState } from "react";
import { useRouter } from "next/router";

const FindPw = () => {
  const router = useRouter();

  // 검색 시도 여부
  const [isSearched, setIsSearched] = useState(false);
  // 비밀번호 없음 여부
  const [notFound, setNotFound] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // 사용자 인증 여부
  // 비번 변경 전 인증코드 관련
  const [codeSent, setCodeSent] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  // 인증코드 전송
  const sendCode = async () => {
    // 수동 유효성 검사 수행
    const errors = await formik.validateForm();

    // email에 에러가 있으면 전송 중단
    if (errors.email) {
      formik.setTouched({ email: true }); // 에러 표시를 위해 touch 처리
      alert("올바른 이메일을 입력해주세요.");
      return;
    }
    console.log(formik.values.email);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/send-code`,
        {
          email: formik.values.email,
        }
      );
      console.log("인증코드 응답", res.data);

      if (res.data.ok) {
        alert("인증번호가 이메일로 전송되었습니다.");
        setCodeSent(true);
      }
    } catch (error) {
      console.error(error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    }
  };

  // 인증코드 확인
  const verifyCode = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`,
        {
          email: formik.values.email,
          code: authCode,
        }
      );

      if (res.data.ok) {
        alert("이메일 인증이 완료되었습니다.");
        setCodeVerified(true);
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (err) {
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  // 비밀번호 찾기 전 유저 검증 요청
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
    },
    validationSchema: findPwValidationSchema,
    onSubmit: async (values) => {
      try {
        // console.log("비밀번호찾기 데이터", values);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/find`,
          {
            type: "pw",
            email: values.email,
            phone: values.phone,
          }
        );
        // console.log("비밀번호 찾기 응답", res.data);

        if (res.data?.ok) {
          setIsSearched(true);
          setNotFound(false);
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setNotFound(true);
          setIsSearched(true);
        }
      } catch (error) {
        console.error("비밀번호 찾기 실패:", error);
        alert("서버 오류가 발생했습니다.");
      }
    },
  });

  // 유저 검증 후 비밀번호 변경요청
  const resetFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePwValidation,
    onSubmit: async (values) => {
      try {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/password`,
          {
            email: formik.values.email,
            newPassword: values.password,
          }
        );

        if (res.data.ok) {
          alert(
            "비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다."
          );
          router.push("/login");
        } else {
        }
      } catch (err) {
        console.error("비밀번호 재설정 실패:", err);
        alert("비밀번호 변경에 실패했습니다.");
      }
    },
  });

  return (
    <FindPwStyled>
      <div className="FindId_container">
        <div className="FindId_title">비밀번호 찾기</div>

        {isVerified ? (
          // 비밀번호 재설정 UI
          <div className="FindId_ResultContainer">
            <form
              onSubmit={resetFormik.handleSubmit}
              className="FindPw_ResetContainer"
            >
              <p className="guide1">입력하신 정보로 사용자가 확인되었습니다.</p>
              <p className="guide2">새로운 비밀번호를 입력해주세요.</p>

              <div className="input_subContainer">
                <div className="FindId_name"></div>
                <input
                  className="FindId_input"
                  type="password"
                  name="password"
                  placeholder="새 비밀번호"
                  value={resetFormik.values.password}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                />

                {resetFormik.touched.password &&
                  resetFormik.errors.password && (
                    <div className="error">{resetFormik.errors.password}</div>
                  )}
              </div>

              <div className="input_subContainer">
                <input
                  className="FindId_input"
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호 확인"
                  value={resetFormik.values.confirmPassword}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                />
                {resetFormik.touched.confirmPassword &&
                  resetFormik.errors.confirmPassword && (
                    <div className="error">
                      {resetFormik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              <button type="submit" className="FindId_ResultBtn">
                비밀번호 변경하기
              </button>
            </form>
          </div>
        ) : notFound && isSearched ? (
          <div className="FindId_ResultContainer">
            <p>입력하신 정보로 계정을 확인할 수 없습니다.</p>
            <div className="FindId_No_container">
              <button
                className="FindId_ResultBtn"
                onClick={() => {
                  setNotFound(false);
                  setIsSearched(false);
                  formik.resetForm();
                }}
              >
                다시 찾기
              </button>
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="FindId_homeBtn"
              >
                홈으로 이동
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="FindId_InputContainer"
          >
            <div className="input_subContainer">
              <div className="FindId_name">
                이메일<span>*</span>
              </div>
              <div className="FindPw_inputCont">
                <input
                  className="FindId_input"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="가입 시 등록한 이메일을 입력해주세요"
                />
                <div className="FindPw_inputBtn">
                  <button onClick={sendCode}>인증번호 발송</button>
                </div>
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>

            {codeSent && (
              <>
                <div className="input_subContainer">
                  <div className="FindId_name">인증번호</div>
                  <div className="FindPw_inputCont">
                    <input
                      className="FindId_input"
                      type="text"
                      inputMode="numeric" // 모바일 키보드에서 숫자 키패드 표시
                      value={authCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        // 숫자 외 입력 방지 및 5자 초과 방지
                        if (/^\d{0,6}$/.test(val)) {
                          setAuthCode(val);
                        }
                      }}
                      placeholder="이메일로 전송된 인증번호를 입력해주세요"
                    />
                    <div className="FindPw_inputBtn ">
                      <button type="button" onClick={verifyCode}>
                        인증번호 확인
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 기존 (노드메일 인증 전) */}
            <div className="input_subContainer">
              <div className="FindId_name">
                휴대전화번호<span>*</span>
              </div>
              <input
                className="FindId_input"
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="숫자만 입력해주세요."
                maxLength={11}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}
            </div>

            {codeSent && (
              <div className="FindId_sub">
                <button type="submit">비밀번호 찾기</button>
              </div>
            )}
          </form>
        )}
      </div>
    </FindPwStyled>
  );
};

export default FindPw;
