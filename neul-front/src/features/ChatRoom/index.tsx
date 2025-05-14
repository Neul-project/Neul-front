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
import { useMessageStore } from "@/stores/useMessageStore";

import MoreBtn from "@/assets/images/more.svg";
import Dropdown from "antd/es/dropdown";
import { MenuProps } from "antd/es/menu";
import Modal from "antd/es/modal";
import message from "antd/es/message";

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
  const [inputValue, setInputValue] = useState("");
  const [adminId, setAdminId] = useState<Number>();
  const [chattings, setChattings] = useState<Chatting[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { clearUnreadCount } = useMessageStore();

  const socketRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const didFetch = useRef(false);

  const router = useRouter();

  // 채팅 개수
  const limit = 12;

  const userId = useAuthStore((state) => state.user?.id);

  // 무조건 아래에서 시작하도록
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  };

  // 채팅 목록 가져오기 요청
  const fetchChatMessages = async () => {
    try {
      const res = await axiosInstance.get(`/chat/list`, {
        // params: { limit, currentPage },
      });

      // 데이터 가공
      const parsedChats: Chatting[] = res.data.map((chat: any) => {
        // 시간, 날짜
        const date = dayjs(chat.created_at).format("YYYY년 MM월 DD일");
        const time = dayjs(chat.created_at).format("A h:mm");

        return {
          ...chat,
          date,
          time,
        };
      });

      console.log("채팅 목록", parsedChats);

      setChattings(parsedChats);
    } catch (e) {
      console.error("챗팅 목록 가져오기 실패: ", e);
    }
  };

  // 담당 관리자 id불러오기
  const getAdminId = async () => {
    try {
      const res = await axiosInstance.get("/user/admin");
      console.log("관리자id는 뭘까", res.data);
      setAdminId(res.data);
    } catch (e: any) {
      if (e.response?.status === 401) {
        message.info(e.response.data.message);
      } else {
        console.error("담당 관리자 불러오기 실패: ", e);
      }
    }
  };

  // 관리자 ID 불러오기 (최초 1회만 실행)
  useEffect(() => {
    if (!didFetch.current) {
      getAdminId();
      didFetch.current = true;
    }
  }, []);

  // adminId가 존재할 때만 실행
  useEffect(() => {
    if (!adminId) return;

    // 채팅 불러오기
    fetchChatMessages();

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
      socketRef.current.disconnect();
    };
  }, [adminId]);

  // 새로운 채팅이 추가될 때마다 자동으로 스크롤 맨 아래로
  useEffect(() => {
    scrollToBottom();
    if (adminId) {
      axiosInstance.post("/chat/user/read", { userId, adminId });
      clearUnreadCount();
    }
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
      message.info("담당 관리자가 없습니다.");
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
          fetchChatMessages();
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
