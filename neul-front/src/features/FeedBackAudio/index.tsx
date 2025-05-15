import axiosInstance from "@/lib/axios";
import { FeedBackAudioStyled } from "./styled";
import { Button, notification } from "antd";
import mic from "@/assets/images/mic.png";
import pause from "@/assets/images/pause.png";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const FeedBackAudio = (props: { activityid: string }) => {
  const { activityid } = props;
  const [isRecording, setIsRecording] = useState(false); //음성 녹음 버튼 클릭 확인용

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

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    //백엔드 저장 요청(오디오)
    axiosInstance
      .post(
        `/activity/feedback/audio`,
        {
          message: formData,
          activityid: Number(activityid),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        //console.log("요청 등록 성공");
        notification.success({
          message: `피드백 등록 완료`,
          description: "피드백을 등록하였습니다.",
        });
      });

    //console.log("audio", mediaBlobUrl);
  };

  const statusMap: Record<string, string> = {
    idle: "대기 중",
    recording: "녹음 중",
    stopped: "녹음 완료. 재녹음이 가능합니다.",
    acquiring_media: "마이크 접근 중",
    failed: "오류 발생",
  };

  return (
    <FeedBackAudioStyled className="FeedBackAudio_main_wrap">
      <div className="FeedBackAudio_recording">
        {!isRecording ? (
          <div className="FeedBackAudio_mic" onClick={handleStartRecording}>
            <img src={mic.src} alt="mic" />
          </div>
        ) : (
          <div className="FeedBackAudio_pause" onClick={handleStopRecording}>
            <img src={pause.src} alt="pause" />
          </div>
        )}
      </div>
      <p className="FeedBackAudio_state">{statusMap[status] || "알 수 없음"}</p>
      <div className="FeedBackAudio_controler">
        <div>미리 듣기</div>
        <audio
          className="FeedBackAudio_audio"
          src={mediaBlobUrl}
          controls
        ></audio>
      </div>
      <div className="FeedBackAudio_footer">
        <Button onClick={uploadRecording} className="FeedBackAudio_footer_send">
          음성 보내기
        </Button>
      </div>
    </FeedBackAudioStyled>
  );
};

export default FeedBackAudio;
