import clsx from "clsx";
import { NavigationElementStyled } from "./styled";
import { useRouter } from "next/router";

//component

//image
import search from "@/assets/images/search.png";
import plus from "@/assets/images/plus.png";
import chat from "@/assets/images/ic-event-survey.png";
import test from "@/assets/images/ic-event-test.png";
import relay from "@/assets/images/ic-event-relay.png";

//네비게이션 컴포넌트
const NavigationElement = () => {
  const router = useRouter();

  //상태확인 페이지 이동
  const stateCheck = () => {
    router.push("/statuscheck");
  };

  //활동기록 페이지 이동
  const ActivityList = () => {
    router.push("/activity");
  };
  //채팅방 이동
  const ChatRoom = () => {
    router.push("/chat");
  };

  return (
    <NavigationElementStyled className={clsx("NavigationElement_main_wrap")}>
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
        <div className="NavigationElement_img">
          <img
            className="NavigationElement_imgstyle"
            src={chat.src}
            alt="puls"
          />
        </div>
        <div className="NavigationElement_text">채팅</div>
      </div>
      <div className="NavigationElement_ele">
        <div className="NavigationElement_img">
          <img
            className="NavigationElement_imgstyle"
            src={relay.src}
            alt="puls"
          />
        </div>
        <div className="NavigationElement_text">프로그램</div>
      </div>
      <div className="NavigationElement_ele">
        <div className="NavigationElement_img">
          <img
            className="NavigationElement_imgstyle"
            src={chat.src}
            alt="puls"
          />
        </div>
        <div className="NavigationElement_text">채팅</div>
      </div>
      <div className="NavigationElement_ele">
        <div className="NavigationElement_img">
          <img
            className="NavigationElement_imgstyle"
            src={test.src}
            alt="puls"
          />
        </div>
        <div className="NavigationElement_text">개인정보</div>
      </div>
    </NavigationElementStyled>
  );
};

export default NavigationElement;
