import clsx from "clsx";
import { ChatMessageStyled } from "./styled";

interface ChatMessageProps {
  name: string; // 도우미 이름
  message: string; // 채팅 내용
  time: string; // 보낸 시간
  sender: string; // 본인이 작성한 chat인지 확인
  userDel: boolean; // 삭제한 메시지인지 확인
}

// 채팅 메시지(본인이 작성한 것인지 판단)
const ChatMessage = ({
  name,
  message,
  time,
  sender,
  userDel,
}: ChatMessageProps) => {
  return (
    <ChatMessageStyled
      className={clsx(
        `chatmessage_wrap ${userDel ? "chatmessage_nonmessage" : ""}`
      )}
    >
      <div
        className={`${
          sender === "user" ? "chatmessage_me" : "chatmessage_other"
        }`}
      >
        {sender === "admin" && (
          <div className="chatmessage_name">{name ? `${name}도우미` : ``}</div>
        )}

        <div className="chatmessage_chat">
          <div className="chatmessage_text">{message}</div>
          <div className="chatmessage_time">{time}</div>
        </div>
      </div>
    </ChatMessageStyled>
  );
};

export default ChatMessage;
