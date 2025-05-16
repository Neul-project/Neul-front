import { ActivityListStyled } from "./styled";
import clsx from "clsx";
import ActivityTable from "../ActivityTable";
import Circle from "@/components/Circle";

//활동 기록 컴포넌트
const ActivityList = () => {
  return (
    <ActivityListStyled className={clsx("ActivityList_main_wrap")}>
      <div className="ActivityList_title">활동 기록 열람하기</div>
      <ActivityTable />
    </ActivityListStyled>
  );
};

export default ActivityList;
