import { LoginPageStyled } from "./styled";
import { useFormik } from "formik";

// 로그인 유효성 검사 yup
import { loginSchema } from "@/utils/joinValidation";

const LoginPage = () => {
  // 로그인 유효성 검사
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("로그인 요청 데이터:", values);
      // 로그인 API 호출 처리
    },
  });

  return (
    <LoginPageStyled>
      <div className="Login_container">
        {/* 로고 */}
        <div className="Login_logoCont">
          <a href="/">
            <img src="/logo_small.png" alt="logo" />
          </a>
        </div>

        {/* 로그인 */}
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="Login_inputWrap">
              <input
                type="email"
                name="email"
                placeholder="이메일"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="Login_inputWrap">
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* 유효성 검사 */}
            {formik.touched.email && formik.errors.email && (
              <div className="Login_validation">{formik.errors.email}</div>
            )}
            {formik.touched.password && formik.errors.password && (
              <div className="Login_validation">{formik.errors.password}</div>
            )}

            <div className="Login_btn">
              <button type="submit">로그인</button>
            </div>
          </div>
        </form>

        <ul className="Login_middle">
          <li>회원가입</li>
          <span></span>
          <li>이메일 찾기</li>
        </ul>

        {/* 소셜 로그인 */}
        <div>
          <div className="Login_easy_container">
            <span className="Login_easy_span"></span>
            <span className="Login_easyLogin_title">간편 로그인</span>
            <span className="Login_easy_span"></span>
          </div>

          <div className="Login_socialLogin">
            <div className="Login_naver">
              <img src="/btnG_아이콘원형.png" alt="naver_login" />
            </div>
            <div className="Login_kakao">
              <img src="/sns_kakao.svg" alt="kakao_login" />
            </div>
          </div>
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
