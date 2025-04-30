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
      <div>로그인 페이지임</div>
    </LoginPageStyled>
  );
};

export default LoginPage;
