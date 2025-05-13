import { LoginPageStyled, SpeechBubble } from "./styled";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

// 로그인 유효성 검사 yup
import { loginSchema } from "@/utils/joinValidation";

// zustand
import { useAuthStore } from "@/stores/useAuthStore";

const LoginPage = () => {
  const router = useRouter();

  const { login } = useAuthStore();

  // 로그인 유효성 검사
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,

    onSubmit: async (values) => {
      console.log("로그인 요청 데이터:", values);

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          values,
          {
            withCredentials: true,
          }
        );

        console.log("로그인 응답 데이터", res.data);

        const { user, token } = res.data;

        // 1. access_token 쿠키 저장
        Cookies.set("access_token", token);

        // 2. 토큰 기반 유저 정보 요청
        const meRes = await axiosInstance.get("/auth/me");

        console.log("유저 정보:", meRes.data);

        // 3. zustand에 로그인 상태 저장
        login(meRes.data); // user: { id, name, provider }

        // 4. 메인페이지 이동
        router.push("/");
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인 정보가 일치하지 않습니다.");
      }
    },
  });

  // 소셜 로그인
  const handleSocialLogin = (provider: "naver" | "kakao") => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${api}/auth/${provider}`;
  };

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
          <li
            onClick={() => {
              router.push("/join");
            }}
          >
            회원가입
          </li>
          <span></span>
          <li>아이디 찾기</li>
        </ul>

        {/* 소셜 로그인 */}
        <div className="Login_socialContainer">
          <div className="Login_easy_container">
            <span className="Login_easy_span"></span>
            <span className="Login_easyLogin_title">간편 로그인</span>
            <span className="Login_easy_span"></span>
          </div>

          <div className="Login_socialLogin">
            <div className="Login_socialWrapper">
              <div
                className="Login_naver hover"
                onClick={() => handleSocialLogin("naver")}
              >
                <img src="/btnG_아이콘원형.png" alt="naver_login" />
              </div>

              <SpeechBubble className="speech">
                소셜로그인은 '<span>일반회원</span>'만 가능합니다.
                <br />
                <p>기업회원은 회원가입을 이용해 주세요.</p>
              </SpeechBubble>
            </div>

            <div className="Login_socialWrapper">
              <div
                className="Login_kakao hover"
                onClick={() => handleSocialLogin("kakao")}
              >
                <img src="/sns_kakao.svg" alt="kakao_login" />
              </div>

              <SpeechBubble className="speech">
                소셜로그인은 '<span>일반회원</span>'만 가능합니다.
                <br />
                <p>기업회원은 회원가입을 이용해 주세요.</p>
              </SpeechBubble>
            </div>
          </div>

          <ul className="Login_guide">
            <li>
              소셜로그인은 '<span>일반회원</span>'만 가능합니다.
            </li>
            <li>기업회원은 회원가입을 이용해 주세요.</li>
          </ul>
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
