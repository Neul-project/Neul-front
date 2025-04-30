import { JoinStyled } from "./styled";
import { useState } from "react";
// 컴포넌트 최적화
import Image from "next/image";

import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

// 회원가입 페이지
const JoinPage = () => {
  // antd 일반, 관리자 사용자 구분
  const option = [
    { value: "user", label: "일반사용자" },
    { value: "manager", label: "관리자" },
  ];

  const [value, setValue] = useState<string>("user");

  const onChange = (val: string) => {
    setValue(val);
  };

  // 회원가입 유효성
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("이메일 형식이 올바르지 않습니다")
      .required("이메일은 필수입니다."),
    password: Yup.string()
      .min(6, "6자리 이상 입력해주세요")
      .required("비밀번호는 필수입니다."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
      .required("비밀번호 확인도 필수입니다."),
    name: Yup.string().required("이름은 필수입니다."),
    guardianName: Yup.string().required("피보호자 이름은 필수입니다."),
    phone: Yup.string()
      .matches(/^01[016789]\d{7,8}$/, "올바른 전화번호를 입력해주세요")
      .required("전화번호는 필수입니다."),
    userType: Yup.string().required("사용자 유형을 선택해주세요."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      guardianName: "",
      phone: "",
      userType: "user",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("회원가입 데이터:", values);
      // 여기에 API 요청 등 연결
    },
  });

  return (
    <JoinStyled>
      <form className="Join_container">
        {/* 로고 */}
        <div className="Join_wrap">
          <Image src="/logo.png" alt="logo" width={150} height={65} />
        </div>

        {/* 이메일, 비번, 비번확인 */}
        <div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              className="Join_input"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className="Join_input"
            />
          </div>
          <div>
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              className="Join_input"
            />
          </div>
        </div>

        {/* 이름, 피보호자 이름, 전화번호 */}
        <div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="이름"
              className="Join_input"
            />
            <input
              type="text"
              name="wardName"
              placeholder="피보호자 이름"
              className="Join_input"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="전화번호"
              className="Join_input"
            />
          </div>
        </div>

        {/* 사용자 구분 */}
        <div>
          <Select value={value} options={option} onChange={onChange} />
        </div>

        {/* 회원가입 버튼 */}
        <div className="Join_submit_btn">
          <button>회원가입</button>
        </div>
      </form>
    </JoinStyled>
  );
};

export default JoinPage;
