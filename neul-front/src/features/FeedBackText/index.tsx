import { FeedBackTextStyled } from "./styled";
import { Button, Input, notification } from "antd";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
const { TextArea } = Input;

const FeedBackText = (props: { activityid: string; onClose: () => void }) => {
  const { activityid, onClose } = props;
  const { user } = useAuthStore();
  //useState
  const [content, setContent] = useState(""); //text area 내용

  //textarea 내용 변환
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("e.target.value", e.target.value);
    setContent(e.target.value);
  };

  //피드백 보내기 클릭 함수
  const feedbacksend = () => {
    if (!user?.id) return;
    const userId = user?.id;

    axiosInstance
      .post(`/activity/feedback`, {
        message: content,
        activityid: Number(activityid),
        userId: userId,
        //recorded_at: "",
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
    <FeedBackTextStyled>
      <TextArea
        rows={8}
        onChange={onChange}
        className="FeedbackText_textarea"
      />

      <div className="FeedbackText_footer">
        <Button
          onClick={feedbacksend}
          className="FeedbackText_footer_feeedback"
        >
          피드백 보내기
        </Button>
      </div>
    </FeedBackTextStyled>
  );
};

export default FeedBackText;
