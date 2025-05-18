import { create } from "zustand";
import axiosInstance from "@/lib/axios";

interface AlertState {
  alertCount: number;
  fetchAlertCount: () => Promise<void>;
  setAlertCount: (count: number) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alertCount: 0,

  fetchAlertCount: async () => {
    try {
      const res = await axiosInstance.get("alert/alarm");

      // setAlertContent(res.data.filter((item: any) => !item.isChecked)); // 알림 내용
      // setMatchAlertNum(
      //   res.data.filter((item: any) => item.message?.includes("match")).length // 매칭 관련 알림 개수
      // );
      // setAlertNum(res.data.filter((item: alertType) => !item.isChecked).length); // 알림 개수
    } catch (e) {
      console.error("알림 내용 가져오기 실패: ", e);
    }
  },

  setAlertCount: (count) => set({ alertCount: count }),
}));
