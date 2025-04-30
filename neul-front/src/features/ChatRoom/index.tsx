import { useEffect, useMemo, useRef, useState } from "react";
import { ChatRoomStyled } from "./styled";
import SendOutlined from "@ant-design/icons/SendOutlined";
import ChatMessage from "../../components/ChatMessage";
import arrow_back from "@/assets/images/arrow_back.svg";
import io from "socket.io-client";
import Image from "next/image";
import clsx from "clsx";
import axios from "axios";

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  name: string;
  chatting: string;
  time: string;
  date: string;
  isMe: boolean;
}

// 채팅 전체 화면
const ChatRoom = () => {
  const [inputValue, setInputValue] = useState("");
  const [chattings, setChattings] = useState<Chatting[]>([
    {
      id: 1,
      name: "보호자",
      chatting: `혹시 그때 가능한가요?`,
      time: "17:06",
      date: "2025년 4월 28일",
      isMe: true,
    },
    {
      id: 2,
      name: "도우미",
      chatting: `내 가능합니다`,
      time: "17:07",
      date: "2025년 4월 28일",
      isMe: false,
    },
    {
      id: 3,
      name: "보호자",
      chatting: `그럼 그때로 할게요`,
      time: "17:08",
      date: "2025년 4월 28일",
      isMe: true,
    },
    {
      id: 4,
      name: "도우미",
      chatting: `네^^`,
      time: "17:09",
      date: "2025년 4월 29일",
      isMe: false,
    },
  ]);

  const socketRef = useRef<any>(null);

  const userId = 1;
  // 채팅 목록 가져오기 요청
  const fetchChatMessages = async () => {
    try {
      // userId를 보냄
      const res = await axios.get(`/chat/${userId}`);
      // [{채팅 고유 id(id), 채팅 작성한 사람 이름(name), 채팅 내용(chatting),
      //  채팅 작성 시간(time), 채팅 작성 날짜(date), 사용자 본인이 작성한지 여부(isMe)}] 보내주기
      setChattings(res.data);
    } catch (e) {
      console.error("챗팅 목록 가져오기 실패: ", e);
    }
  };

  useEffect(() => {
    // 채팅 목록 처음 1번 불러옴
    fetchChatMessages();

    // 소켓 연결
    socketRef.current = io("http://localhost:5000", {
      withCredentials: true,
    });

    socketRef.current.on("receive_message", (message: Chatting) => {
      // 새 메시지 수신 -> 채팅 상태 업데이트
      setChattings((prev) => [...prev, message]);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 종료
      socketRef.current.disconnect();
    };
  }, []);

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
      chatting: inputValue, // 보낼 메시지 내용
    };

    try {
      // 서버에 메시지 저장 요청
      await axios.post("/chat", messageToSend);

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
              {messages.map((chat) => (
                <ChatMessage
                  key={chat.id}
                  name={chat.name}
                  chatting={chat.chatting}
                  time={chat.time}
                  isMe={chat.isMe}
                />
              ))}
            </div>
          ))}
        </div>
        {/* 보내는 메시지 */}
        <div className="chatroom_message_box">
          <div className="chatroom_message">
            <input
              type="text"
              placeholder="메시지 입력"
              value={inputValue}
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
