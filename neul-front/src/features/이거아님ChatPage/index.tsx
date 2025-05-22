import { useState } from "react";
import { ChatPageStyled } from "./styled";
import clsx from "clsx";
import ChatRoomList from "../1ChatRoomList.tsx";
import ChatView from "../1ChatView.tsx";

import arrow_back from "@/assets/images/arrow_back.svg";
import Image from "next/image";

import { useRouter } from "next/router";

const ChatPage = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  // 라우터
  const router = useRouter();

  return (
    <ChatPageStyled className={clsx("chat_wrap")}>
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

      {/* 채팅방 */}
      <div
        className={`chat_room_list ${
          selectedRoomId !== null ? "hide_on_mobile" : ""
        }`}
      >
        <ChatRoomList onSelectRoom={setSelectedRoomId} />
      </div>

      {/* 채팅창 */}
      <div
        className={`chat_view ${
          selectedRoomId === null ? "hide_on_mobile" : ""
        }`}
      >
        <ChatView
          roomId={selectedRoomId}
          onBack={() => setSelectedRoomId(null)}
        />
      </div>
    </ChatPageStyled>
  );
};

export default ChatPage;
