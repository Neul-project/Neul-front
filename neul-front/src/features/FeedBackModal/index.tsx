import { useEffect, useState } from "react";
import { FeedBackModalStyled } from "./styled";

//antd
import { Button, Input, notification } from "antd";
import axiosInstance from "@/lib/axios";
const { TextArea } = Input;

//image

import clsx from "clsx";
import FeedBackAudio from "../FeedBackAudio";

//활동 페이지 > 피드백 내용 모달
const FeedBackModal = (props: { activityid: string; onClose: () => void }) => {
  //변수 선언
  const { activityid, onClose } = props;

  //useState
  const [content, setContent] = useState(""); //text area 내용

  //textarea 내용 변환
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("e.target.value", e.target.value);
    setContent(e.target.value);
  };

  //피드백 보내기 클릭 함수
  const feedbacksend = () => {
    axiosInstance
      .post(`/activity/feedback`, {
        message: content,
        activityid: Number(activityid),
        recorded_at: "",
      })
      .then((res) => {
        notification.success({
          message: `피드백 등록 완료`,
          description: "피드백을 등록하였습니다.",
        });

        onClose();
      });
  };

  return (
    <FeedBackModalStyled className={clsx("FeedbackModal_main_wrap")}>
      <TextArea
        rows={8}
        onChange={onChange}
        className="FeedbackModal_textarea"
      />
      <FeedBackAudio activityid={activityid} />
      <div className="FeedbackModal_footer">
        <Button
          onClick={feedbacksend}
          className="FeedbackModal_footer_feeedback"
        >
          피드백 보내기
        </Button>
      </div>
    </FeedBackModalStyled>
  );
};

export default FeedBackModal;
