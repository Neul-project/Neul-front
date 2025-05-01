import LoginPage from "@/features/LoginPage";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const hasRun = useRef(false);

  const router = useRouter();
  const reason = router.query.reason;

  // middleware.ts에서 보낸 쿼리를 통해 alert처리
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true; // alert 한 번만 실행하기 위함

    if (reason === "auth") {
      alert("로그인이 필요합니다.");
    }
  }, [reason]);

  return <LoginPage />; // UI만 담당
};
export default Login;
