import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ChatRoomStyled } from "./styled";
import SendOutlined from "@ant-design/icons/SendOutlined";
import ChatMessage from "../../components/ChatMessage";
import arrow_back from "@/assets/images/arrow_back.svg";
import io from "socket.io-client";
import Image from "next/image";
import clsx from "clsx";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일 불러오기
import { useAuthStore } from "@/stores/useAuthStore";
import { useMessageStore } from "@/stores/useMessageStore";

import MoreBtn from "@/assets/images/more.svg";
import Dropdown from "antd/es/dropdown";
import { MenuProps } from "antd/es/menu";
import Modal from "antd/es/modal";
import message from "antd/es/message";
import { notification } from "antd";

dayjs.locale("ko"); // 로케일 설정

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  user: any;
  admin: any;
  message: string;
  time: string;
  date: string;
  sender: string;
  userDel: boolean;
}

// 1. 상단에 테스트용 데이터 생성
const generateMockData = (page: number, limit: number): Chatting[] => {
  const mock: Chatting[] = [];
  const total = 50; // 전체 데이터 수 (예: 50개)
  const start = total - (page + 1) * limit;
  const end = total - page * limit;

  for (let i = Math.max(0, start); i < end; i++) {
    const createdAt = dayjs().subtract(i, "minute");
    mock.push({
      id: i,
      user: { id: 1, name: "테스트 유저" },
      admin: { id: 999, name: "관리자" },
      message: `테스트 메시지 ${i + 1}`,
      date: createdAt.format("YYYY년 MM월 DD일"),
      time: createdAt.format("A h:mm"),
      sender: i % 2 === 0 ? "user" : "admin",
      userDel: false,
    });
  }

  return mock;
};

// 채팅 전체 화면
const ChatRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부

  const { clearUnreadCount } = useMessageStore();

  const socketRef = useRef<any>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const didFetch = useRef(false);

  const router = useRouter();

  // 채팅 개수
  const limit = 12;

  const { adminId } = useAuthStore();
  console.log(adminId);
  const userId = useAuthStore((state) => state.user?.id);

  // 무조건 아래에서 시작하도록
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 2. fetchChatMessages 함수 수정 (axios 제거)
  const fetchChatMessages = useCallback(async (page: number) => {
    const parsedChats = generateMockData(page, limit);

    if (parsedChats.length < limit) setHasMore(false);

    if (page === 0) {
      setChattings(parsedChats.reverse());
      setTimeout(() => scrollToBottom(), 100);
    } else {
      setChattings((prev) => [...parsedChats.reverse(), ...prev]);
    }
  }, []);

  // 특정 페이지 채팅 불러오기 (페이지당 12개)
  // const fetchChatMessages = useCallback(
  //   async (page: number) => {
  //     if (!userId) return;

  //     try {
  //       const res = await axiosInstance.get(`/chat/list`, {
  //         params: { userId, page, limit },
  //       });

  //       // 데이터 가공
  //       const parsedChats: Chatting[] = res.data.map((chat: any) => {
  //         // 시간, 날짜
  //         const date = dayjs(chat.created_at).format("YYYY년 MM월 DD일");
  //         const time = dayjs(chat.created_at).format("A h:mm");

  //         return {
  //           ...chat,
  //           date,
  //           time,
  //         };
  //       });

  //       console.log("채팅 목록", parsedChats);

  //       // 페이징 처리, 가져온 메시지가 limit보다 적으면 더 이상 불러올 게 없음
  //       if (parsedChats.length < limit) setHasMore(false);

  //       if (page === 0) {
  //         // 최초 불러오기 (맨 아래부터 보여야 하니까)
  //         setChattings(parsedChats.reverse());
  //         setTimeout(() => scrollToBottom(), 100);
  //       } else {
  //         // 기존 데이터 위에 추가 (역순이라 맨 위에 추가)
  //         setChattings((prev) => [...parsedChats.reverse(), ...prev]);
  //       }
  //     } catch (e) {
  //       console.error("채팅 목록 가져오기 실패: ", e);
  //     }
  //   },
  //   [userId]
  // );

  // adminId가 존재할 때만 실행
  useEffect(() => {
    if (!adminId) {
      if (!didFetch.current) {
        notification.info({
          message: "아직 담당자가 매칭되지 않았습니다.",
        });
        didFetch.current = true;
      }
      return;
    }

    fetchChatMessages(0);
    setCurrentPage(0);
    setHasMore(true);

    // 관리자한테 온 채팅 읽음 처리 요청
    axiosInstance.post("/chat/user/read", {
      userId,
      adminId,
    });

    // 안읽은 메시지 초기화
    clearUnreadCount();

    // 소켓 연결
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    socketRef.current.off("receive_message");
    socketRef.current.on("receive_message", (message: any) => {
      const date = dayjs(message.created_at).format("YYYY년 MM월 DD일");
      const time = dayjs(message.created_at).format("A h:mm");

      const parsedMessage: Chatting = {
        ...message,
        date,
        time,
      };

      // 새 메시지 수신 -> 채팅 상태 업데이트
      setChattings((prev) => [...prev, parsedMessage]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [adminId, fetchChatMessages, userId, clearUnreadCount]);

  // 새로운 채팅이 추가될 때마다 자동으로 스크롤 맨 아래로
  useEffect(() => {
    scrollToBottom();
    if (adminId) {
      axiosInstance.post("/chat/user/read", { userId, adminId });
      clearUnreadCount();
    }
  }, [chattings, adminId, userId, clearUnreadCount]);

  // 무한스크롤(맨 위 스크롤 관찰)
  useEffect(() => {
    if (!hasMore) return; // 더 이상 불러올 게 없으면 종료

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 맨 위에 닿으면 다음 페이지 불러오기
          fetchChatMessages(currentPage + 1);
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const target = topObserverRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [currentPage, fetchChatMessages, hasMore]);

  // 날짜별로 그룹화
  const groupDate = useMemo(() => {
    const filteredChats = chattings.filter((chat) => !chat.userDel);
    return filteredChats.reduce((acc: Record<string, Chatting[]>, chat) => {
      if (!acc[chat.date]) acc[chat.date] = [];
      acc[chat.date].push(chat);
      return acc;
    }, {});
  }, [chattings]);

  // 채팅 보내기
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    if (adminId) {
      // 채팅 객체
      const messageToSend = {
        userId: userId, // 로그인한 사용자 ID
        message: inputValue, // 보낼 메시지 내용
        sender: "user",
      };

      try {
        // 소켓 실시간 메시지 전송
        socketRef.current.emit("send_message", messageToSend);

        // 입력창 초기화
        setInputValue("");
      } catch (e) {
        console.error("채팅 메시지 전송 실패:", e);
      }
    } else {
      notification.info({
        message: "담당 관리자가 없습니다.",
      });
    }
  };

  // 삭제하기 요청
  const deleteAllChat = async () => {
    Modal.confirm({
      title: "모든 채팅 내용을 삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      okText: "삭제",
      cancelText: "취소",
      okButtonProps: {
        style: { backgroundColor: "#5DA487" },
      },
      cancelButtonProps: {
        style: { color: "#5DA487" },
      },
      async onOk() {
        try {
          // 채팅 전체 삭제 요청
          await axiosInstance.delete(`/chat/alldelete`, {
            params: { userId },
          });
          message.success("모든 채팅 내용이 삭제되었습니다.");
          await fetchChatMessages(0);
          setCurrentPage(0);
          setHasMore(true);
          scrollToBottom();
        } catch (e) {
          console.error("모든 채팅 내용 삭제 실패: ", e);
          message.error("모든 채팅 내용 삭제에 실패했습니다.");
        }
      },
    });
  };

  const itemDelete: MenuProps["items"] = [
    {
      label: <div onClick={deleteAllChat}>전체 삭제</div>,
      key: "0",
    },
  ];

  return (
    <ChatRoomStyled className={clsx("chatroom_wrap")}>
      {/* 헤더 */}
      <div className="chatroom_header">
        <div className="chatroom_backicon_box">
          <Image
            onClick={() => {
              router.push("/");
            }}
            className="chatroom_backicon"
            src={arrow_back}
            alt="뒤로가기"
          />
        </div>

        <div className="chatroom_title">1:1 채팅</div>

        <Dropdown
          menu={{
            items: itemDelete,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <div className="chatroom_more_btn">
              <Image className="chatroom_moreicon" src={MoreBtn} alt="더보기" />
            </div>
          </a>
        </Dropdown>
      </div>
      {/* 채팅 내용 */}
      <div className="chatroom_content_box">
        <div className="chatroom_content">
          {/* 맨 위 감시용 div */}
          <div ref={topObserverRef} />
          {Object.entries(groupDate).map(([date, messages]) => (
            <div key={date}>
              <div className="chatroom_date">{date}</div>
              {messages.map((chat, i) => {
                const currentTime = chat.time;
                const nextTime = messages[i + 1]?.time;
                const nextSender = messages[i + 1]?.sender;
                const shouldShowTime =
                  chat.sender !== nextSender || currentTime !== nextTime;
                return (
                  <ChatMessage
                    key={chat.id}
                    name={chat.admin.name}
                    message={chat.message}
                    time={shouldShowTime ? chat.time : ""}
                    sender={chat.sender}
                    userDel={chat.userDel}
                  />
                );
              })}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        {/* 보내는 메시지 */}
        <div className="chatroom_message_box">
          <div className="chatroom_message">
            <input
              type="text"
              disabled={!adminId}
              placeholder={
                adminId
                  ? "메시지 입력"
                  : "매칭된 도우미가 없어서 채팅이 불가합니다."
              }
              value={inputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
          <SendOutlined
            className={`chatroom_sendbtn ${
              !adminId || inputValue.trim() === "" ? "chatroom_disabled" : ""
            }`}
            onClick={sendMessage}
          />
        </div>
      </div>
    </ChatRoomStyled>
  );
};

export default ChatRoom;
