import { ActivityListStyled } from "./styled";
import clsx from "clsx";
import ActivityTable from "../ActivityTable";

//활동 기록 컴포넌트
const ActivityList = () => {
  return (
    <ActivityListStyled className={clsx("ActivityList_main_wrap")}>
      <div className="ActivityList_h1">활동 기록 열람하기</div>
      <ActivityTable />
    </ActivityListStyled>
  );
};

export default ActivityList;
