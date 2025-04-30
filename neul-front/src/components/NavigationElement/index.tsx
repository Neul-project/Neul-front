import { NavigationElementStyled } from "./styled";
import { useRouter } from "next/router";

//component

//네비게이션
const NavigationElement = () => {
  const router = useRouter();

  //상태확인 페이지 이동
  const stateCheck = () => {
    router.push("/");
  };

  //활동기록 페이지 이동
  const ActivityList = () => {
    router.push("/activity");
  };

  return (
    <NavigationElementStyled>
      <div onClick={stateCheck}>상태확인</div>
      <div onClick={ActivityList}>활동기록</div>
    </NavigationElementStyled>
  );
};

export default NavigationElement;
