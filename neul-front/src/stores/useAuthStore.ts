// stores/useAuthStore.ts
import { create } from "zustand";

type AuthState = {
  user: { id: number; name: string } | null;
  isLoggedIn: boolean;
  login: (user: { id: number; name: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
