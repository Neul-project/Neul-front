import { useEffect, useState } from "react";
import { FeedBackModalStyled } from "./styled";
import { useReactMediaRecorder } from "react-media-recorder";

//antd
import { Button, Input } from "antd";
import axiosInstance from "@/lib/axios";
const { TextArea } = Input;

//image
import mic from "@/assets/images/mic.png";
import pause from "@/assets/images/pause.png";
import clsx from "clsx";

//활동 페이지 > 피드백 내용 모달
const FeedBackModal = (props: { activityid: string }) => {
  //변수 선언
  const { activityid } = props;

  //useState
  const [content, setContent] = useState(""); //text area 내용
  const [isRecording, setIsRecording] = useState(false); //음성 녹음 버튼 클릭 확인용

  //textarea 내용 변환
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //console.log("e.target.value", e.target.value);
    setContent(e.target.value);
  };

  //피드백 보내기 클릭 함수
  const feedbacksend = () => {
    const userId = 1;

    axiosInstance.post(`/activity/feedback`, {
      message: content,
      activityid: Number(activityid),
      userId: userId,
    });
  };

  //오디오 설정
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  //음성 녹음 시작 버튼
  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  //음성 녹음 중단 버튼
  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };
  const uploadRecording = async () => {
    if (!mediaBlobUrl) {
      console.error("mediaBlobUrl이 없습니다. 먼저 녹음을 해주세요");
      return;
    }

    const response = await fetch(mediaBlobUrl); // Blob URL로부터 Blob만 가져오기(blob http:3000/ ~~ -> ~~만 추출)
    const blob = await response.blob();

    const formData = new FormData();
    const now = new Date();
    //파일명 변경 (yyyymmddhhmm)
    const fileName = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}.webm`;

    formData.append("file", blob, fileName);

    const userId = 1;

    //**백엔드 저장 요청
    axiosInstance
      .post(
        `/activity/feedback`,
        {
          message: formData,
          activityid: Number(activityid),
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("요청 등록 성공");
      });

    //console.log("audio", mediaBlobUrl);
  };
  ``;

  return (
    <FeedBackModalStyled className={clsx("FeedbackModal_main_wrap")}>
      <TextArea
        rows={8}
        onChange={onChange}
        className="FeedbackModal_textarea"
      />

      <div className="FeedbackModal_recording">
        <p>{status}</p>
        {!isRecording ? (
          <div className="FeedbackModal_mic" onClick={handleStartRecording}>
            <img src={mic.src} alt="mic" />
          </div>
        ) : (
          <div className="FeedbackModal_pause" onClick={handleStopRecording}>
            <img src={pause.src} alt="pause" />
          </div>
        )}
      </div>
      <div className="FeedbackModal_controler">
        <audio
          className="FeedbackModal_audio"
          src={mediaBlobUrl}
          controls
        ></audio>
      </div>
      <div className="FeedbackModal_footer">
        <Button onClick={uploadRecording} className="FeedbackModal_footer_send">
          음성 보내기
        </Button>
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
