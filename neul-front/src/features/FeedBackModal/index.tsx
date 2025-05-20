import { useEffect, useState } from "react";
import { FeedBackModalStyled } from "./styled";

import clsx from "clsx";
import FeedBackAudio from "../FeedBackAudio";
import FeedBackText from "../FeedBackText";

// antd
import { ConfigProvider, Radio } from "antd";
import { AntdGlobalTheme } from "@/utils/antdtheme";

//활동 페이지 > 피드백 내용 모달
const FeedBackModal = (props: { activityid: string; onClose: () => void }) => {
  //변수 선언
  const { activityid, onClose } = props;

  return (
    <FeedBackModalStyled className={clsx("FeedbackModal_main_wrap")}>
      <FeedBackText activityid={activityid} onClose={onClose} />
    </FeedBackModalStyled>
  );
};

export default FeedBackModal;
