import { create } from "zustand";
import axiosInstance from "@/lib/axios";

interface CartState {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
  setCartCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartCount: 0,

  fetchCartCount: async () => {
    try {
      const res = await axiosInstance.get("/program/count");
      set({ cartCount: res.data.count });
    } catch (e) {
      console.error("장바구니 개수 가져오기 실패:", e);
    }
  },

  setCartCount: (count) => set({ cartCount: count }),
}));
