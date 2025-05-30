import LoginPage from "@/features/LoginPage";

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { notification } from "antd";

const Login = () => {
  const hasRun = useRef(false);

  const router = useRouter();
  const reason = router.query.reason;

  // middleware.ts에서 보낸 쿼리를 통해 alert처리
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true; // alert 한 번만 실행하기 위함

    if (reason === "auth") {
      notification.error({
        message: "로그인이 필요합니다.",
      });
    }
    // console.log("router.query", router.query);
  }, [router.isReady, reason]);

  return <LoginPage />; // UI만 담당
};
export default Login;
