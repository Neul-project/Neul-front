// utils/dateUtils.ts
//
export const isRefundAvailable = (recruitment: string): boolean => {
  try {
    const endDateStr = recruitment.split("~")[1].trim(); // "2025.09.30"
    const [year, month, day] = endDateStr.split(".").map(Number);

    const endDate = new Date(year, month - 1, day);
    const cutoffDate = new Date(endDate);
    cutoffDate.setDate(cutoffDate.getDate() - 1); // 하루 전

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간 정보 제거

    return today <= cutoffDate;
  } catch (error) {
    console.error("환불 가능 여부 판단 중 오류:", error);
    return true; // 기본적으로 환불 가능 처리
  }
};
