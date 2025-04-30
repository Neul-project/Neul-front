import { LoginPageStyled } from "./styled";

// 소셜로그인 버튼 type
export interface ButtonProps {
  $bgColor: string;
  color?: string;
  $border: string;
  $iconURL?: string;
  size?: string;
}

const LoginPage = () => {
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
        <div>
          <div className="Login_inputWrap">
            <input type="email" placeholder="이메일" />
          </div>
          <div className="Login_inputWrap">
            <input type="password" placeholder="비밀번호" />
          </div>
          <div className="Login_btn">
            <button>로그인</button>
          </div>
        </div>

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
