import { useEffect, useRef, useState } from "react";
import { RoomListStyled } from "./styled";
import { useAuthStore } from "@/stores/useAuthStore";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import axiosInstance from "@/lib/axios";
import dayjs from "dayjs";

interface ChatRoomPreview {
  id: number;
  userId: number; // 보호자 id
  userName: string; // 보호자 이름
  patientName: string; // 피보호자 이름
  lastMessage: string;
  lastTime: string; // "2025-04-29 17:09"
  unreadCount?: number;
  isMatched?: boolean;
}

interface Props {
  onSelectRoom: (roomId: number) => void;
}

const dummyChatRooms: ChatRoomPreview[] = [
  {
    id: 1,
    userId: 1001,
    userName: "김보호자",
    patientName: "홍길동",
    lastMessage: "오늘 산책은 잘 하셨어요?",
    lastTime: "2025-05-23 15:42",
    unreadCount: 2,
    isMatched: true,
  },
  {
    id: 2,
    userId: 1002,
    userName: "이보호자",
    patientName: "이순신",
    lastMessage: "식사는 하셨나요?",
    lastTime: "2025-05-23 12:20",
    unreadCount: 0,
    isMatched: true,
  },
  {
    id: 3,
    userId: 1003,
    userName: "박보호자",
    patientName: "강감찬",
    lastMessage: "감사합니다! 오늘도 수고 많으셨어요.",
    lastTime: "2025-05-22 18:05",
    unreadCount: 1,
    isMatched: false,
  },
  {
    id: 4,
    userId: 1004,
    userName: "최보호자",
    patientName: "세종대왕",
    lastMessage: "내일 일정은 어떻게 될까요?",
    lastTime: "2025-05-21 09:30",
    unreadCount: 0,
    isMatched: true,
  },
];

// 채팅방 목록
const ChatRoomList = ({ onSelectRoom }: Props) => {
  const [chatRoomList, setChatRoomList] = useState<ChatRoomPreview[]>([]);

  // 무한스크롤에 필요한 것들
  const [currentRoom, setCurrentRoom] = useState<ChatRoomPreview>();
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [pageRoom, setPageRoom] = useState(1);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [hasMoreRoom, setHasMoreRoom] = useState(true);

  const userId = useAuthStore((state) => state.user?.id);

  // 채팅방
  const chatRoomLimit = 12;

  const scrollContainerRefRoom = useRef<HTMLDivElement>(null);
  const isFetchingRoom = useRef(false);

  // 채팅방 아래쪽 감지해서 요청
  const fetchNextRoomPage = async () => {
    if (loadingRoom || !hasMoreRoom || isFetchingRoom.current) return;

    isFetchingRoom.current = true;
    const nextPageRoom = pageRoom + 1;

    await fetchChatRoomList(nextPageRoom);
    setPageRoom(nextPageRoom);
    isFetchingRoom.current = false;
  };
  const targetRoomRef = useInfiniteScroll({
    hasMore: hasMoreRoom,
    loading: loadingRoom,
    onIntersect: fetchNextRoomPage,
  });

  // 채팅방 목록 불러오기
  const fetchChatRoomList = async (pageToFetch = 1) => {
    const containerRoom = scrollContainerRefRoom.current;
    const prevScrollHeightRoom = containerRoom?.scrollHeight ?? 0;
    try {
      const res = await axiosInstance.get("/chat/rooms", {
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

  useEffect(() => {
    // 채팅방 불러오기(자신의 담당 보호자-피보호자들)/새로고침시 가져오도록
    if (!userId) return;
    setChatRoomList(dummyChatRooms);
    // fetchChatRoomList(1);
  }, [userId]);

  return (
    <RoomListStyled>
      {/* 채팅 상대 선택 */}
      <div className="chatroom_select">
        {chatRoomList.length !== 0 ? (
          <>
            {chatRoomList.map((room) => (
              <div
                key={room.id}
                className={`chatroom_item ${
                  selectedRoomId === room.id ? "selected" : ""
                }`}
                onClick={() => onSelectRoom(room.id)}
              >
                <div className="chatroom_name_box">
                  <div className="chatroom_name">
                    <span className="chatroom_patientname">
                      {room.patientName}님의 보호자님
                    </span>
                    <span className="chatroom_stick"> - </span>
                    <span className="chatroom_username">{room.userName}</span>
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
                    <span className="chatroom_unread">{room.unreadCount}</span>
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
    </RoomListStyled>
  );
};

export default ChatRoomList;
