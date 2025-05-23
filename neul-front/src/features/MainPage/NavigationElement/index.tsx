import clsx from "clsx";
import { NavigationElementStyled } from "./styled";
import { useRouter } from "next/router";
import io from "socket.io-client";
//component

//image
import search from "@/assets/images/search.png";
import plus from "@/assets/images/plus.png";
import chat from "@/assets/images/ic-event-survey.png";
import test from "@/assets/images/ic-event-test.png";
import relay from "@/assets/images/ic-event-relay.png";
import helper from "@/assets/images/helper.png";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios";

import { useMessageStore } from "@/stores/useMessageStore";
import { Badge, message, notification } from "antd";
import { useAuthStore } from "@/stores/useAuthStore";

//네비게이션 컴포넌트
const NavigationElement = () => {
  const { setAdminId, adminId, user } = useAuthStore();

  const { setUnreadCount, increaseUnreadCount, clearUnreadCount } =
    useMessageStore();

  const router = useRouter();

  // 안 읽은 채팅 개수 가져오기
  const fetchUnreadCount = async () => {
    if (!adminId || !user?.id) return;

    try {
      const res = await axiosInstance.get("/chat/unreadCount");
      console.log(res.data);
      setUnreadCount(res.data);
    } catch (e: any) {
      console.error("안 읽은 채팅 개수 가져오기 실패:", e);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 개수 가져오기
    if (!adminId) return;
    fetchUnreadCount();

    // 소켓 연결
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      withCredentials: true,
    });

    // 다른 사람이 채팅 보내면 알림 개수 증가
    socket.on("receive_message", (data: any) => {
      // 현재 userid랑 받은 아이디와 같은지 확인
      if (user?.id === data.user.id) {
        increaseUnreadCount(); // unreadCount 증가
      }
    });

    // 컴포넌트 언마운트 시 소켓 연결 종료
    return () => {
      socket.disconnect();
    };
  }, [adminId, increaseUnreadCount, clearUnreadCount]);

  //상태확인 페이지 이동
  const stateCheck = () => {
    router.push("/status");
  };

  //활동기록 페이지 이동
  const ActivityList = () => {
    router.push("/activity");
  };
  //채팅방 이동
  const ChatRoom = () => {
    router.push("/chat");
  };

  //마이페이지 이동
  const MyPage = () => {
    router.push("/mypage");
  };

  //프로그램 페이지 이동
  const ProgramPage = () => {
    router.push("/program");
  };

  //도우미 신청 페이지 이동
  const HelperPage = () => {
    router.push("/helper");
  };

  return (
    <NavigationElementStyled className={clsx("NavigationElement_main_wrap")}>
      <div className="NavigationElement_title">바로가기</div>
      <div className="NavigationElement_rows">
        <div className="NavigationElement_row1">
          <div className="NavigationElement_ele" onClick={stateCheck}>
            <div className="NavigationElement_img">
              <img
                className="NavigationElement_imgstyle"
                src={search.src}
                alt="search"
              />
            </div>
            <div className="NavigationElement_text">상태확인</div>
          </div>
          <div className="NavigationElement_ele" onClick={ActivityList}>
            <div className="NavigationElement_img">
              <img
                className="NavigationElement_imgstyle"
                src={plus.src}
                alt="puls"
              />
            </div>
            <div className="NavigationElement_text">활동기록</div>
          </div>
          <div className="NavigationElement_ele" onClick={ChatRoom}>
            <Badge
              count={useMessageStore.getState().unreadCount}
              size="small"
              offset={[-2, 20]}
            >
              <div className="NavigationElement_img">
                <img
                  className="NavigationElement_imgstyle"
                  src={chat.src}
                  alt="puls"
                />
              </div>
            </Badge>
            <div className="NavigationElement_text">채팅</div>
          </div>
        </div>
        <div className="NavigationElement_row2">
          <div className="NavigationElement_ele" onClick={ProgramPage}>
            <div className="NavigationElement_img">
              <img
                className="NavigationElement_imgstyle"
                src={relay.src}
                alt="puls"
              />
            </div>
            <div className="NavigationElement_text">프로그램</div>
          </div>

          <div className="NavigationElement_ele" onClick={HelperPage}>
            <div className="NavigationElement_img">
              <img
                className="NavigationElement_imgstyle"
                src={helper.src}
                alt="puls"
              />
            </div>
            <div className="NavigationElement_text">도우미 신청</div>
          </div>

          <div className="NavigationElement_ele" onClick={MyPage}>
            <div className="NavigationElement_img">
              <img
                className="NavigationElement_imgstyle"
                src={test.src}
                alt="puls"
              />
            </div>
            <div className="NavigationElement_text">마이페이지</div>
          </div>
        </div>
      </div>
    </NavigationElementStyled>
  );
};

export default NavigationElement;
