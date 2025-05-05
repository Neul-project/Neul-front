import { useEffect, useState } from "react";
import { FeedBackModalStyled } from "./styled";

//antd
import { Button, Input } from "antd";
import axiosInstance from "@/lib/axios";
const { TextArea } = Input;

//활동 페이지 > 피드백 내용 모달
const FeedBackModal = (props: { activityid: string }) => {
  const { activityid } = props;
  const [content, setContent] = useState(""); //text area 내용

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("e.target.value", e.target.value);
    setContent(e.target.value);
  };

  //피드백 보내기 클릭 함수
  const feedbacksend = () => {
    const userId = 1;

    axiosInstance.post(`/activity/feedback`, {
      params: { message: content, activityid: activityid, userId: userId },
    });
  };

  return (
    <FeedBackModalStyled>
      <TextArea rows={8} onChange={onChange} />
      <Button onClick={feedbacksend}>피드백 보내기</Button>
    </FeedBackModalStyled>
  );
};

export default FeedBackModal;
