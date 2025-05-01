import LoginPage from "@/features/LoginPage";

import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const reason = router.query.reason;

  useEffect(() => {
    if (reason === "auth") {
      alert("로그인이 필요합니다.");
    }
  }, [reason]);

  return <LoginPage />; // UI만 담당
};
export default Login;
