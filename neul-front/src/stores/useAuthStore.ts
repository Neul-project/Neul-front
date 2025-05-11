// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import Cookies from "js-cookie";

type User = {
  id: number;
  name: string;
  provider?: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => {
        console.log("zustand login 실행됨, user:", user);
        set({ user, isLoggedIn: true });
      },
      logout: () => {
        // access_token 삭제
        Cookies.remove("access_token");

        // refresh_token 삭제
        Cookies.remove("refresh_token");

        // 상태 초기화
        set({ user: null, isLoggedIn: false });
        console.log("zustand logout 쿠키 및 상태 초기화");
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키
    }
  )
);
