import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});

// 요청 인터셉터 - access_token을 동적으로 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  // console.log("token:", token);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 401 발생 시 로그인 페이지로 리디렉션
// axiosInstance.interceptors.response.use(
//   (response) => response, // 성공 응답은 그대로 반환
//   (error) => {
//     if (
//       error.response?.status === 401 &&
//       typeof window !== "undefined" && // 브라우저 환경인지 확인
//       !error.config.url.includes("/check-temp-token")
//     ) {
//       // access_token 쿠키 삭제 (선택적)
//       Cookies.remove("access_token");

//       // 로그인 페이지로 이동
//       Router.replace("/login?reason=auth");
//     }

//     return Promise.reject(error);
//   }
// );

// 응답 인터셉터 - 401 발생 시 로그인 페이지로 리디렉션
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !error.config?.url?.includes("/check-temp-token")
    ) {
      Cookies.remove("access_token");

      // 현재 페이지가 로그인 페이지가 아닐 경우에만 리다이렉트
      if (window.location.pathname !== "/login") {
        Router.replace("/login?reason=auth");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
