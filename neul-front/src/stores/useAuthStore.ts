// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { useCartStore } from "./useCartStore";

type User = {
  id: number;
  name: string;
  provider?: string;
  role: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  adminId: number | null;
  login: (user: User) => void;
  logout: () => void;
  setAdminId: (id: number | null) => void;
  checkToken: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      adminId: null,

      login: (user) => {
        // console.log("zustand user:", user);
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        // 로그아웃 시 장바구니 초기화
        useCartStore.setState({ cartCount: 0 });

        set({ user: null, isLoggedIn: false, adminId: null });
        // console.log("zustand logout 쿠키 및 상태 초기화");
      },

      setAdminId: (id: number | null) => set({ adminId: id }),

      checkToken: () => {
        const token = Cookies.get("access_token");
        // const { isLoggedIn } = get();

        if (!token) {
          get().logout(); // 자동 로그아웃
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
