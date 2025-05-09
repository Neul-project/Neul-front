// stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키
    }
  )
);
