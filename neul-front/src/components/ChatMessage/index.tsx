import clsx from "clsx";
import { ChatMessageStyled } from "./styled";
import { useEffect, useState } from "react";

interface ChatMessageProps {
  name: string; // 피보호자 이름
  chatting: string; // 채팅 내용
  time: string; // 보낸 시간
  isMe: boolean; // 본인이 작성한 chat인지 확인
  isHelper: boolean; // 도우미인지 확인
}

// 채팅 메시지(본인이 작성한 것인지 판단)
const ChatMessage = ({
  name,
  chatting,
  time,
  isMe,
  isHelper,
}: ChatMessageProps) => {
  const [other, setOther] = useState("");

  useEffect(() => {
    isMe ? setOther("나") : setOther(name);
  }, [isMe, name]);

  return (
    <ChatMessageStyled className={clsx("chatmessage_wrap")}>
      <div className="chatmessage_name">{other}</div>
      <div className="chatmessage_info">
        <div>{time}</div>
        <div>{chatting}</div>
      </div>
    </ChatMessageStyled>
  );
};

export default ChatMessage;
