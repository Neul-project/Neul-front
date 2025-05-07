import { useEffect, useMemo, useRef, useState } from "react";
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

dayjs.locale("ko"); // 로케일 설정

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  user: any;
  admin: any;
  message: string;
  time: string;
  date: string;
  isMe: boolean;
}

// 채팅 전체 화면
const ChatRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const [chattings, setChattings] = useState<Chatting[]>([]);

  const socketRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const userId = useAuthStore((state) => state.user?.id);

  // 무조건 아래에서 시작하도록
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 채팅 목록 가져오기 요청
  const fetchChatMessages = async () => {
    try {
      // userId를 보냄
      const res = await axiosInstance.get(`/chat/list`, {
        params: { userId },
      });

      // 데이터 가공
      const parsedChats: Chatting[] = res.data.map((chat: any) => {
        // 본인이 작성한 채팅인지 확인
        const isMe = chat.user.id === userId;

        // 시간, 날짜
        const date = dayjs(chat.created_at).format("YYYY년 MM월 DD일");
        const time = dayjs(chat.created_at).format("A h:mm");

        return {
          ...chat,
          isMe,
          date,
          time,
        };
      });

      setChattings(parsedChats);
    } catch (e) {
      console.error("챗팅 목록 가져오기 실패: ", e);
    }
  };

  useEffect(() => {
    // 채팅 목록 처음 1번 불러옴
    fetchChatMessages();

    // 소켓 연결
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    socketRef.current.off("receive_message"); // 기존 리스너 제거
    socketRef.current.on("receive_message", (message: any) => {
      const isMe = message.user?.id === userId;

      const date = dayjs(message.created_at).format("YYYY년 MM월 DD일");
      const time = dayjs(message.created_at).format("A h:mm");

      const parsedMessage: Chatting = {
        ...message,
        isMe,
        date,
        time,
      };

      // 새 메시지 수신 -> 채팅 상태 업데이트
      setChattings((prev) => [...prev, parsedMessage]);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 종료
      socketRef.current.disconnect();
    };
  }, []);

  // 새로운 채팅이 추가될 때마다 자동으로 스크롤 맨 아래로
  useEffect(() => {
    scrollToBottom();
  }, [chattings]);

  // 날짜별로 그룹화
  const groupDate = useMemo(() => {
    return chattings.reduce((acc: Record<string, Chatting[]>, chat) => {
      if (!acc[chat.date]) acc[chat.date] = [];
      acc[chat.date].push(chat);
      return acc;
    }, {});
  }, [chattings]);

  // 채팅 보내기
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // 채팅 객체
    const messageToSend = {
      userId: userId, // 로그인한 사용자 ID
      adminId: null, // 관리자가 보낸 채팅이 아니라는 것을 알기 위해 null로 표시
      message: inputValue, // 보낼 메시지 내용
    };

    try {
      // 소켓 실시간 메시지 전송
      socketRef.current.emit("send_message", messageToSend);

      // 입력창 초기화
      setInputValue("");
    } catch (e) {
      console.error("채팅 메시지 전송 실패:", e);
    }
  };

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
      </div>
      {/* 채팅 내용 */}
      <div className="chatroom_content_box">
        <div className="chatroom_content">
          {Object.entries(groupDate).map(([date, messages]) => (
            <div key={date}>
              <div className="chatroom_date">{date}</div>
              {messages.map((chat, i) => {
                const currentTime = chat.time;
                const nextTime = messages[i + 1]?.time;
                const shouldShowTime = currentTime !== nextTime;
                return (
                  <ChatMessage
                    key={chat.id}
                    name={chat.admin.name}
                    message={chat.message}
                    time={shouldShowTime ? chat.time : ""}
                    isMe={chat.isMe}
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
              placeholder="메시지 입력"
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
              inputValue.trim() === "" ? "chatroom_disabled" : ""
            }`}
            onClick={sendMessage}
          />
        </div>
      </div>
    </ChatRoomStyled>
  );
};

export default ChatRoom;
