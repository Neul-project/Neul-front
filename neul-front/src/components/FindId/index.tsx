import axios from "axios";
import { FindIdStyled } from "./styled";

import { useFormik } from "formik";

import { findIdValidationSchema } from "@/utils/userValidation";

const FindId = () => {
  // 아이디 찾기
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: findIdValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/auth/find-email", {
          name: values.name,
          phone: values.phone,
        });

        if (res.data?.email) {
          alert(`등록된 이메일: ${res.data.email}`);
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
        <div className="FindId_title">아이디 찾기</div>

        <div className="FindId_InputContainer">
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
              placeholder="숫자만 입력 (예: 01012345678)"
              maxLength={11}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="error">{formik.errors.phone}</div>
            )}
          </div>

          <div className="FindId_sub">
            <button>아이디 찾기</button>
          </div>
        </div>
      </div>
    </FindIdStyled>
  );
};

export default FindId;
