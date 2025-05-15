import axios from "axios";
import { FindIdStyled } from "./styled";

import { useFormik } from "formik";
import { findIdValidationSchema } from "@/utils/userValidation";

import { useState } from "react";
import { useRouter } from "next/router";

const FindId = () => {
  const router = useRouter();

  const [foundEmail, setFoundEmail] = useState<string | null>(null);

  console.log("foundEmail", foundEmail);

  // 아이디 찾기
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: findIdValidationSchema,
    onSubmit: async (values) => {
      try {
        console.log("아이디찾기 데이터", values);

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/find-email`,
          {
            name: values.name,
            phone: values.phone,
          }
        );
        console.log("아이디 찾기 응답", res.data);

        if (res.data?.email) {
          setFoundEmail(res.data.email);
        } else {
          alert("일치하는 이메일을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("아이디 찾기 실패:", error);
        alert("서버 오류가 발생했습니다.");
      }
    },
  });

  return (
    <FindIdStyled>
      <div className="FindId_container">
        <div className="FindId_title">
          {foundEmail ? "아이디 찾기 완료" : "아이디 찾기"}
        </div>

        {foundEmail ? (
          <div className="FindId_ResultContainer">
            <p>아이디 찾기가 완료되었습니다.</p>
            <div className="FindId_ResultEmail">{foundEmail}</div>
            <button
              className="FindId_ResultBtn"
              onClick={() => router.push("/login")}
            >
              로그인
            </button>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="FindId_InputContainer"
          >
            <div className="input_subContainer">
              <div className="FindId_name">
                이름<span>*</span>
              </div>
              <input
                className="FindId_input"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="이름을 입력해주세요"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>

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

            <div className="FindId_sub">
              <button type="submit">아이디 찾기</button>
            </div>
          </form>
        )}
      </div>
    </FindIdStyled>
  );
};

export default FindId;
