import { useState } from "react";
import { ChatRoomStyled } from "./styled";
import ChatMessage from "../ChatMessage";

//Chatting 인터페이스 정의
interface Chatting {
  id: number;
  name: string;
  chatting: string;
  time: string;
  isMe: boolean;
  isHelper: boolean;
}

const ChatRoom = () => {
  const [chattings, setChattings] = useState<Chatting[]>([
    {
      id: 1,
      name: "보호자",
      chatting: `혹시 그때 가능한가요?`,
      time: "17:06",
      isMe: true,
      isHelper: false,
    },
    {
      id: 2,
      name: "도우미",
      chatting: `내 가능합니다`,
      time: "17:07",
      isMe: false,
      isHelper: true,
    },
    {
      id: 3,
      name: "보호자",
      chatting: `그럼 그때로 할게요`,
      time: "17:08",
      isMe: true,
      isHelper: false,
    },
    {
      id: 4,
      name: "도우미",
      chatting: `네^^`,
      time: "17:09",
      isMe: false,
      isHelper: true,
    },
  ]);

  return (
    <ChatRoomStyled>
      <div>
        {chattings.map((chattings) => (
          <ChatMessage
            key={chattings.id}
            name={chattings.name}
            chatting={chattings.chatting}
            time={chattings.time}
            isMe={chattings.isMe}
            isHelper={chattings.isHelper}
          />
        ))}
      </div>
    </ChatRoomStyled>
  );
};

export default ChatRoom;
