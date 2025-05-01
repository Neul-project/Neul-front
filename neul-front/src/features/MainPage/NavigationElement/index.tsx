import clsx from "clsx";
import { NavigationElementStyled } from "./styled";
import { useRouter } from "next/router";

//component

//image
import search from "@/assets/images/search.png";
import plus from "@/assets/images/plus.png";

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
        상태확인
      </div>
      <div className="NavigationElement_ele" onClick={ActivityList}>
        <div className="NavigationElement_img">
          <img
            className="NavigationElement_imgstyle"
            src={plus.src}
            alt="puls"
          />
        </div>
        활동기록
      </div>
      <div className="NavigationElement_ele">기타</div>
    </NavigationElementStyled>
  );
};

export default NavigationElement;
