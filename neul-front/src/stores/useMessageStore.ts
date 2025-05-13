import { create } from "zustand";

// 안 읽은 채팅 개수
type MessageState = {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  increaseUnreadCount: () => void;
  clearUnreadCount: () => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  increaseUnreadCount: () =>
    set((state) => ({ unreadCount: state.unreadCount + 1 })),
  clearUnreadCount: () => set({ unreadCount: 0 }),
}));
