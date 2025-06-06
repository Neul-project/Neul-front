// components/RoleGuard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";
import Loading from "@/components/Loading";
import { notification } from "antd";

interface RoleGuardProps {
  blockedRoles: string[]; // 차단할 role, 예: ['admin']
  children: React.ReactNode;
}

/**
 * RoleGuardProps
 * @param 사용방법 - <RoleGuard blockedRoles={['admin', 'helper']} />
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ blockedRoles, children }) => {
  const router = useRouter();
  const { user, isLoggedIn, checkToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [alertShown, setAlertShown] = useState(false); // alert 중복 방지용

  // 첫 로딩 시 토큰 검사하고 로딩 종료
  useEffect(() => {
    checkToken();
    setLoading(false);
  }, [checkToken]);

  // 차단된 역할일 경우 alert띄우고 '/'로
  useEffect(() => {
    if (!loading && isLoggedIn && user && blockedRoles.includes(user.role)) {
      if (!alertShown) {
        notification.info({
          message: "보호자만 이용 가능한 페이지입니다.",
          description: "도우미는 도우미 전용 페이지를 이용해주세요.",
        });
        setAlertShown(true);
        router.push("/");
      }
    }
  }, [loading, isLoggedIn, user, alertShown, blockedRoles]);

  // 로딩 중일 때 로딩 컴포넌트
  if (loading) return <Loading />;

  // 로그인 안된 경우 로그인 페이지로 이동
  if (!isLoggedIn || !user) {
    if (!alertShown) {
      notification.error({
        message: "로그인이 필요합니다",
        description: "로그인 페이지로 이동합니다.",
      });
      setAlertShown(true);
    }

    router.replace("/login");
    return null;
  }

  // 차단된 역할은 렌더링 차단
  if (blockedRoles.includes(user.role)) return null;

  // 정상 접근일 때 하위 컴포넌트 렌더링
  return <>{children}</>;
};

export default RoleGuard;
