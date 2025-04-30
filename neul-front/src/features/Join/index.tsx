import { JoinStyled } from "./styled";
import { useState } from "react";
// 이미지 최적화
import Image from "next/image";
import Logo from "@/assets/images/logo_small.png";

import { Select } from "antd";
import { useFormik } from "formik";

// 회원가입 유효성 검사 yup
import { joinValidationSchema } from "@/utils/joinValidation";
import axios from "axios";

// 회원가입 페이지
const JoinPage = () => {
  // antd 일반, 관리자 사용자 구분
  const option = [
    { value: "user", label: "일반사용자" },
    { value: "manager", label: "관리자" },
  ];

  const [value, setValue] = useState<string>("user");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      wardName: "",
      phone: "",
      userType: "user",
    },
    validationSchema: joinValidationSchema,
    onSubmit: async (values) => {
      console.log("회원가입 데이터:", values);

      try {
        const response = await axios.post("http://localhost:5000/auth/signup", {
          email: values.email,
          password: values.password,
          name: values.name,
          wardName: values.wardName,
          phone: values.phone,
          userType: values.userType,
        });

        console.log("회원가입 성공!", response.data);
        // 예: 회원가입 성공 후 로그인 페이지로 이동
        // Router.push("/login");
      } catch (error) {
        console.error("회원가입 실패", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    },
  });

  return (
    <JoinStyled>
      {/* 로고 */}
      <div className="Join_logoWrap">
        <a href="/">
          <Image src={Logo} alt="logo" width={150} height={65} priority />
        </a>
      </div>

      <div>
        {/* 회원가입 input */}
        <form className="Join_container" onSubmit={formik.handleSubmit}>
          {/* 사용자 구분 */}
          <div className="Join_selectBox">
            <Select
              value={formik.values.userType}
              options={option}
              onChange={(val) => {
                formik.setFieldValue("userType", val);
              }}
            />
          </div>

          {/* 이메일, 비번, 비번확인 */}
          <div className="Join_firstInputWrap">
            <div className="Join_inputWrap Join_email">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="Join_inputWrap Join_password">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div className="Join_inputWrap Join_passCheck">
              <input
                type="password"
                name="passwordCheck"
                placeholder="비밀번호 확인"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordCheck}
              />
            </div>
          </div>

          {/* 유효성 검사 */}
          {formik.touched.email && formik.errors.email && (
            <div className="Join_validation">{formik.errors.email}</div>
          )}
          {formik.touched.password && formik.errors.password && (
            <div className="Join_validation">{formik.errors.password}</div>
          )}
          {formik.touched.passwordCheck && formik.errors.passwordCheck && (
            <div className="Join_validation">{formik.errors.passwordCheck}</div>
          )}

          {/* 이름, 피보호자 이름, 전화번호 */}
          <div className="Join_secondInputWrap">
            <div className="Join_inputWrap Join_name">
              <input
                type="text"
                name="name"
                placeholder="이름"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            <div className="Join_inputWrap Join_wardName">
              <input
                type="text"
                name="wardName"
                placeholder="피보호자 이름"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.wardName}
              />
            </div>
            <div className="Join_inputWrap Join_phone">
              <input
                type="text"
                name="phone"
                placeholder="휴대전화번호 ('-'제외)"
                className="Join_input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                maxLength={11}
              />
            </div>
          </div>

          {/* 유효성 검사 */}
          {formik.touched.name && formik.errors.name && (
            <div className="Join_validation">{formik.errors.name}</div>
          )}
          {formik.touched.wardName && formik.errors.wardName && (
            <div className="Join_validation">{formik.errors.wardName}</div>
          )}
          {formik.touched.phone && formik.errors.phone && (
            <div className="Join_validation">{formik.errors.phone}</div>
          )}

          {/* 회원가입 버튼 */}
          <div className="Join_submit_btn">
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
    </JoinStyled>
  );
};

export default JoinPage;
