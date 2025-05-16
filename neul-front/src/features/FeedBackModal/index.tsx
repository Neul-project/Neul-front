import { useEffect, useState } from "react";
import { FeedBackModalStyled } from "./styled";

import clsx from "clsx";
import FeedBackAudio from "../FeedBackAudio";
import FeedBackText from "../FeedBackText";

// antd
import { Radio } from "antd";

//활동 페이지 > 피드백 내용 모달
const FeedBackModal = (props: { activityid: string; onClose: () => void }) => {
  //변수 선언
  const { activityid, onClose } = props;
  const [selectedType, setSelectedType] = useState<"text" | "audio">("text");

  return (
    <FeedBackModalStyled className={clsx("FeedbackModal_main_wrap")}>
      <div className="FeedbackModal_radio_group">
        <Radio.Group
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
          buttonStyle="solid"
        >
          <Radio value="text">텍스트</Radio>
          <Radio value="audio">오디오</Radio>
        </Radio.Group>
      </div>

      {/* 조건부 렌더링 */}
      {selectedType === "audio" ? (
        <FeedBackAudio activityid={activityid} />
      ) : (
        <FeedBackText activityid={activityid} onClose={onClose} />
      )}
    </FeedBackModalStyled>
  );
};

export default FeedBackModal;
