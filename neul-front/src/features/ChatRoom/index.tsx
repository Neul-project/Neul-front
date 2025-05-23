import { useEffect, useMemo, useRef, useState } from "react";
import { ChatRoomStyled } from "./styled";
import SendOutlined from "@ant-design/icons/SendOutlined";
import io from "socket.io-client";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import axiosInstance from "@/lib/axios";
import "dayjs/locale/ko"; // 한국어 로케일 불러오기
import { MenuProps, message, Modal, notification } from "antd";
import { useAuthStore } from "@/stores/useAuthStore";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { DownOutlined } from "@ant-design/icons";
import ChatMessage from "@/components/ChatMessage";
import { useRouter } from "next/router";
import Image from "next/image";
import MoreBtn from "@/assets/images/more.svg";
import Dropdown from "antd/es/dropdown";
import arrow_back from "@/assets/images/arrow_back.svg";

dayjs.extend(localizedFormat);
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
  created_at: string;
  room: any;
}
interface ChatRoomPreview {
  id: number;
  adminId: number; // 도우미 id
  adminName: string; // 도우미 이름
  lastMessage: string;
  lastTime: string; // "2025-04-29 17:09"
  unreadCount?: number;
  isMatched?: boolean;
}

// 채팅 전체 화면
const ChatRoom = () => {
  // 입력한 채팅
  const [inputValue, setInputValue] = useState("");
  const [chatRoomList, setChatRoomList] = useState<ChatRoomPreview[]>([]);

  // 무한스크롤에 필요한 것들
  const [currentRoom, setCurrentRoom] = useState<ChatRoomPreview>();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [chattings, setChattings] = useState<Chatting[]>([]);

  // 무한스크롤에 필요한 것들
  // 채팅창
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 채팅방
  const [pageRoom, setPageRoom] = useState(1);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [hasMoreRoom, setHasMoreRoom] = useState(true);

  // 소켓
  const socketRef = useRef<any>(null);

  // 라우터
  const router = useRouter();

  // 바텀버튼
  const [showBottomButton, setShowBottomButton] = useState(false);

  // 맨 밑 감지
  const bottomRef = useRef<HTMLDivElement>(null);

  // 선택한 방의 roomid
  const selectedRoomIdRef = useRef<number | null>(null);

  // 메모리 접근
  const userId = useAuthStore((state) => state.user?.id);

  // 채팅방
  const chatRoomLimit = 12;

  // 채팅창
  const chatLimit = 20;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isFetching = useRef(false);

  const scrollContainerRefRoom = useRef<HTMLDivElement>(null);
  const isFetchingRoom = useRef(false);

  // 채팅창 위쪽 감지해서 요청
  const fetchNextPage = async () => {
    if (loading || !hasMore || isFetching.current) return;
    if (selectedRoomIdRef.current === null) return;

    isFetching.current = true;
    const nextPage = page + 1;

    await handleSelectRoom(nextPage, selectedRoomIdRef.current);
    setPage(nextPage);
    isFetching.current = false;
  };
  const targetRef = useInfiniteScroll({
    hasMore,
    loading,
    onIntersect: fetchNextPage,
  });

  // 채팅방 아래쪽 감지해서 요청
  const fetchNextRoomPage = async () => {
    if (loadingRoom || !hasMoreRoom || isFetchingRoom.current) return;

    isFetchingRoom.current = true;
    const nextPageRoom = pageRoom + 1;

    await fetchChatRoomList(nextPageRoom);
    setPage(nextPageRoom);
    isFetchingRoom.current = false;
  };
  const targetRoomRef = useInfiniteScroll({
    hasMore: hasMoreRoom,
    loading: loadingRoom,
    onIntersect: fetchNextRoomPage,
  });

  // 무조건 아래에서 시작하도록
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
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

  // 채팅방 목록 불러오기
  const fetchChatRoomList = async (pageToFetch = 1) => {
    const containerRoom = scrollContainerRefRoom.current;
    const prevScrollHeightRoom = containerRoom?.scrollHeight ?? 0;
    try {
      // 해당 user의 채팅방 불러오기
      const res = await axiosInstance.get("/chat/user/rooms", {
        params: { userId, page: pageToFetch, limit: chatRoomLimit },
      });

      setChatRoomList((prev) =>
        pageToFetch === 1 ? res.data : [...prev, ...res.data]
      );

      // hasMore는 데이터 개수가 limit보다 작으면 false
      setHasMoreRoom(res.data.length >= chatRoomLimit);
      setPageRoom(pageToFetch);

      // 렌더링이 끝난 뒤 scrollTop 조절(스크롤 높이 차이만큼 위로 올려주는 방식)
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (containerRoom) {
            const newScrollHeightRoom = containerRoom.scrollHeight;
            containerRoom.scrollTop =
              newScrollHeightRoom - prevScrollHeightRoom;
          }
        }, 0);
      });
    } catch (e) {
      console.error("채팅방 목록 불러오기 실패: ", e);
    }
  };

  // 채팅 목록 가져오기 요청
  const handleSelectRoom = async (pageToFetch = 1, roomId: number) => {
    const container = scrollContainerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    setSelectedRoomId(roomId);
    selectedRoomIdRef.current = roomId;

    setLoading(true);

    // 선택된 방 정보
    const selectedRoom = chatRoomList.find((room) => room.id === roomId);
    setCurrentRoom(selectedRoom);
    console.log(roomId, "선택한 방의 id");

    try {
      const res = await axiosInstance.get(`/chat/list`, {
        params: { roomId, page: pageToFetch, limit: chatLimit },
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

      // 읽음 처리 요청
      axiosInstance.post("/chat/user/read", {
        roomId,
      });

      // 선택 시 unreadCount 초기화
      setChatRoomList((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, unreadCount: 0 } : room
        )
      );

      // hasMore는 데이터 개수가 limit보다 작으면 false
      setHasMore(parsedChats.length === chatLimit);
      setPage(pageToFetch);

      // 렌더링이 끝난 뒤 scrollTop 조절
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (container) {
            const newScrollHeight = container.scrollHeight;
            const scrollOffset = newScrollHeight - prevScrollHeight;
            container.scrollTop = scrollOffset;
            // 최초 로딩 시 맨 아래로
            if (pageToFetch === 1) scrollToBottom();
          }
        }, 30);
      });
    } catch (e) {
      console.error("선택한 유저의 채팅 불러오기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 채팅방 불러오기(자신의 담당 보호자-피보호자들)/새로고침시 가져오도록
    if (!userId) return;
    fetchChatRoomList(1);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    // 소켓 연결
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    if (socketRef.current) {
      socketRef.current.off("receive_message");
      socketRef.current.on("receive_message", (message: Chatting) => {
        const date = dayjs(message.created_at).format("YYYY년 MM월 DD일");
        const time = dayjs(message.created_at).format("A h:mm");

        const parsedMessage = {
          ...message,
          date,
          time,
        };

        // 현재 보고 있는 방일 때만 메시지 추가
        if (message.room.id === selectedRoomIdRef.current) {
          setChattings((prev) => [...prev, parsedMessage]);

          // 읽음 처리 요청
          axiosInstance.post("/chat/user/read", {
            roomId: selectedRoomIdRef.current,
          });
        }

        setChatRoomList((prevRooms) =>
          prevRooms.map((room) =>
            room.id === message.room.id
              ? {
                  ...room,
                  lastMessage: message.message,
                  lastTime: message.created_at,
                  unreadCount:
                    message.room.id === selectedRoomId
                      ? 0
                      : (room.unreadCount || 0) + 1,
                }
              : room
          )
        );
      });
    }

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 종료
      socketRef.current?.off("receive_message");
      socketRef.current?.disconnect();
    };
  }, [selectedRoomId]);

  useEffect(() => {
    if (!loading && !isFetching.current) {
      // 맨 아래에서 새 메시지가 추가된 경우만 스크롤 이동
      scrollToBottom();
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
    if (!inputValue.trim() || selectedRoomId === null) return;

    // 채팅 객체
    const messageToSend = {
      roomId: selectedRoomId, // 채팅방 id
      message: inputValue, // 보낼 메시지 내용
      sender: "user",
    };

    try {
      // 소켓 실시간 메시지 전송
      socketRef.current.emit("send_message", messageToSend, (response: any) => {
        if (response.status === "ok") {
          setInputValue("");
        } else {
          notification.error({
            message: "전송 실패",
            description: response.error,
          });
        }
      });

      // 입력창 초기화
      setInputValue("");
    } catch (e) {
      console.error("채팅 메시지 전송 실패:", e);
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
          // 채팅 내용 전체 삭제 요청
          await axiosInstance.delete(`/chat/alldelete`, {
            params: { roomId: selectedRoomId },
          });
          message.success("모든 채팅 내용이 삭제되었습니다.");
          setSelectedRoomId(null);
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
      </div>
      <div className="chatroom_box">
        {/* 채팅 상대 선택 */}
        <div
          className={`chatroom_select ${
            selectedRoomId === null ? "" : "close"
          }`}
        >
          {chatRoomList.length !== 0 ? (
            <>
              {chatRoomList.map((room) => (
                <div
                  key={room.id}
                  className={`chatroom_item ${
                    selectedRoomId === room.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectRoom(1, room.id)}
                >
                  <div className="chatroom_name_box">
                    <div className="chatroom_name">
                      <span className="chatroom_patientname">
                        {room.adminName} 도우미
                      </span>
                    </div>
                    <div className="chatroom_lasttime">
                      {(() => {
                        const now = dayjs();
                        const last = dayjs(room.lastTime, "YYYY-MM-DD HH:mm");
                        return last.isSame(now, "day")
                          ? last.format("A h:mm") // 오후 5:09
                          : last.format("YYYY-MM-DD");
                      })()}
                    </div>
                  </div>
                  <div className="chatroom_lastmessage_box">
                    <span className="chatroom_lastmessage">
                      {room.lastMessage}
                    </span>
                    {room.unreadCount ? (
                      <span className="chatroom_unread">
                        {room.unreadCount}
                      </span>
                    ) : null}
                  </div>
                  <div ref={targetRoomRef}></div>
                </div>
              ))}
            </>
          ) : (
            <div className="chatroom_unpeople">담당 도우미가 없습니다.</div>
          )}
        </div>
        {/* 채팅 내용 */}
        <div
          className={`chatroom_content_box ${
            selectedRoomId !== null ? "" : "close"
          }`}
        >
          {showBottomButton && (
            <div className="chatroom_bottom_button" onClick={scrollToBottom}>
              <DownOutlined />
            </div>
          )}
          <div className="chatroom_content" ref={scrollContainerRef}>
            {selectedRoomId ? (
              <div className="chat-scroll-wrapper">
                <div className="chatroom_content_header">
                  <Image
                    onClick={() => {
                      setSelectedRoomId(null);
                    }}
                    className="chatroom_backicon"
                    src={arrow_back}
                    alt="뒤로가기"
                  />
                  <Dropdown
                    menu={{
                      items: itemDelete,
                    }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <div className="chatroom_more_btn">
                        <Image
                          className="chatroom_moreicon"
                          src={MoreBtn}
                          alt="더보기"
                        />
                      </div>
                    </a>
                  </Dropdown>
                </div>
                {/* 채팅창 위쪽 감지 */}
                {hasMore && (
                  <div
                    ref={targetRef}
                    style={{
                      height: 1,
                    }}
                  />
                )}
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
                          key={i}
                          name={i === 0 || shouldShowTime ? chat.user.name : ""}
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
            ) : (
              <div className="chatroom_uncontent">채팅방을 선택해주세요.</div>
            )}
          </div>
          {/* 보내는 메시지 */}
          {selectedRoomId && (
            <div className="chatroom_message_box">
              <div className="chatroom_message">
                <input
                  type="text"
                  placeholder={
                    currentRoom?.isMatched
                      ? "메시지 입력"
                      : "매칭이 끊겨 더 이상의 채팅은 불가능합니다."
                  }
                  value={inputValue}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  readOnly={!currentRoom?.isMatched}
                />
              </div>
              <SendOutlined
                className={`chatroom_sendbtn ${
                  inputValue.trim() === "" ? "chatroom_disabled" : ""
                }`}
                onClick={sendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </ChatRoomStyled>
  );
};

export default ChatRoom;
