import { useEffect, useMemo, useRef, useState } from "react";
import { ChatRoomStyled } from "./styled";
import SendOutlined from "@ant-design/icons/SendOutlined";
import ChatMessage from "../../components/ChatMessage";
import arrow_back from "@/assets/images/arrow_back.svg";
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
import { message } from "antd";
import { notification } from "antd";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { io, Socket } from "socket.io-client";
import { DownOutlined } from "@ant-design/icons";

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

// 채팅 전체 화면
const ChatRoom = () => {
  // 입력한 채팅
  const [inputValue, setInputValue] = useState("");
  const [chattings, setChattings] = useState<Chatting[]>([]);

  // 무한스크롤에 필요한 것들
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 알림 0으로 초기화
  const { clearUnreadCount } = useMessageStore();

  // 맨밑 감지
  const bottomRef = useRef<HTMLDivElement>(null);
  const didFetch = useRef(false);

  // 바텀버튼
  const [showBottomButton, setShowBottomButton] = useState(false);

  // 소켓
  const socketRef = useRef<Socket | null>(null);

  // 라우터
  const router = useRouter();

  // 채팅 개수
  const limit = 12;

  const { adminId, user } = useAuthStore();
  const userId = user?.id;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  const fetchNextPage = async () => {
    if (loading || !hasMore || isFetching.current) return;
    if (page === 1 && chattings.length === 0) return; // 첫 페이지 로딩 완료 전엔 호출 막기
    isFetching.current = true;
    const nextPage = page + 1;
    await fetchChatMessages(nextPage);
    setPage(nextPage);
    isFetching.current = false;
  };
  const targetRef = useInfiniteScroll({
    hasMore,
    loading,
    onIntersect: fetchNextPage,
  });

  // 무조건 아래에서 시작하도록
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 채팅 목록 가져오기 요청
  const fetchChatMessages = async (pageToFetch = 1) => {
    const container = scrollContainerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/chat/list`, {
        params: { userId, page: pageToFetch, limit },
      });

      // 데이터 가공
      const parsedChats: Chatting[] = res.data
        .map((chat: any) => {
          // 시간, 날짜
          const date = dayjs(chat.created_at).format("YYYY년 MM월 DD일");
          const time = dayjs(chat.created_at).format("A h:mm");

          return {
            ...chat,
            date,
            time,
          };
        })
        .filter((chat: Chatting) => !chat.userDel); // 삭제된 메시지는 한번더 걸러주기(메모리에서)

      setChattings((prev) =>
        pageToFetch === 1 ? parsedChats : [...parsedChats, ...prev]
      );

      // hasMore는 데이터 개수가 limit보다 작으면 false
      setHasMore(parsedChats.length === limit);
      setPage(pageToFetch);

      // 렌더링이 끝난 뒤 scrollTop 조절
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - prevScrollHeight;

            // 최초 로딩 시 맨 아래로
            if (pageToFetch === 1) scrollToBottom();
          }
        }, 0);
      });
    } catch (e) {
      console.error("챗팅 목록 가져오기 실패: ", e);
    } finally {
      setLoading(false);
    }
  };

  // 스크롤 위치가 맨 아래가 아닌 경우 버튼을 보이도록
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      50;

    setShowBottomButton(!isAtBottom);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // adminId가 존재할 때만 실행
  useEffect(() => {
    if (!adminId || didFetch.current) return;

    didFetch.current = true;

    fetchChatMessages(1);

    // 관리자한테 온 채팅 읽음 처리 요청
    axiosInstance.post("/chat/user/read", {
      userId,
      adminId,
    });

    // 안읽은 메시지 초기화
    clearUnreadCount();

    // 소켓 연결
    if (!socketRef.current) {
      socketRef.current = io(process.env.NEXT_PUBLIC_API_URL!, {
        withCredentials: true,
      });

      socketRef.current.on("receive_message", handleReceiveMessage);
    }
    return () => {
      socketRef.current?.off("receive_message", handleReceiveMessage);
      socketRef.current?.disconnect();
      socketRef.current = null;
      didFetch.current = false;
    };
  }, [adminId]);

  const handleReceiveMessage = (message: any) => {
    const date = dayjs(message.created_at).format("YYYY년 MM월 DD일");
    const time = dayjs(message.created_at).format("A h:mm");

    const parsedMessage: Chatting = {
      ...message,
      date,
      time,
    };

    setChattings((prev) => [...prev, parsedMessage]);
  };

  // 새로운 채팅이 추가될 때마다 자동으로 스크롤 맨 아래로
  useEffect(() => {
    scrollToBottom();
    if (adminId) {
      axiosInstance.post("/chat/user/read", { userId, adminId });
      clearUnreadCount();
    }
  }, [chattings, clearUnreadCount]);

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
        socketRef.current?.emit("send_message", messageToSend);

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
          await fetchChatMessages();
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
        {showBottomButton && (
          <div className="chatroom_bottom_button" onClick={scrollToBottom}>
            <DownOutlined />
          </div>
        )}
        <div className="chatroom_content scrollable" ref={scrollContainerRef}>
          <div ref={targetRef} style={{ height: 1 }} />
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
