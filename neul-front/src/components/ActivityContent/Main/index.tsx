import { ActivityContentStyled, theme } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import dynamic from "next/dynamic";
import { getActivityLabel } from "@/utils/activityoptionlist";

//antd
import { Select, Radio, Input, Button, Modal, ConfigProvider } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";

const { TextArea } = Input;

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useAuthStore } from "@/stores/useAuthStore";

const FeedBackModal = dynamic(() => import("@/features/FeedBackModal"), {
  ssr: false,
});

//활동 기록 컴포넌트
const ActivityContent = (props: { id: string }) => {
  //변수 선언
  const { id } = props;
  const { user } = useAuthStore();
  const [rehabilitation, setRehabilitation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(""); //제목
  const [img, setImg] = useState([""]); //이미지 배열
  const [type, setType] = useState(""); //재활치료
  const [note, setNote] = useState("");

  //useEffect
  useEffect(() => {
    if (!user?.id) return;
    const userId = user?.id;

    //활동기록리스트 id와 userId에 따른 내용 전체 확인
    axiosInstance
      .get(`/activity/detail`, {
        params: { userId: userId, id: id },
      })
      .then((res) => {
        //console.log("res", res.data);

        const data = res.data;
        const imgarr = data.img.split(",");
        setTitle(data.title);
        setRehabilitation(data.rehabilitation);
        setType(data.type);
        setNote(data.note);
        setImg(imgarr);
      });
  }, [user]);

  const optionsWithDisabled: CheckboxGroupProps<string>["options"] = [
    { label: "참여", value: "yes", disabled: rehabilitation !== "yes" },
    { label: "미참여", value: "no", disabled: rehabilitation !== "no" },
    { label: "비대상", value: "none", disabled: rehabilitation !== "none" },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feedback = () => {
    setIsModalOpen(true);
  };

  return (
    <ActivityContentStyled className={clsx("ActivityContent_main_wrap")}>
      <div className="ActivityContent_title">
        <div>{title}</div> 활동기록 열람
      </div>

      {/* 제목 */}
      <div className="ActivityContent_subtitle">
        제목 <div>{title}</div>
      </div>

      {/* 스와이퍼 이미지 */}
      <div>
        <Swiper
          modules={[Pagination, Autoplay]}
          className="ActivityContent_swiper"
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {img.map((element, index: number) => (
            <SwiperSlide key={index}>
              <img
                src={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + element}
                alt={`preview-0`}
                className="ActivityContent_swperimg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 활동 종류 & 재활 치료*/}
      <div className="ActivityContent_type">
        <div>
          <div className="ActivityContent_text">활동 종류</div>
          <ConfigProvider theme={theme}>
            <Select
              value={getActivityLabel(type)}
              style={{ width: 200 }}
              disabled
            />
          </ConfigProvider>
        </div>
        <div>
          <div className="ActivityContent_text">재활 치료</div>
          <ConfigProvider theme={theme}>
            <Radio.Group
              options={optionsWithDisabled}
              value={rehabilitation}
              optionType="button"
              buttonStyle="solid"
            />
          </ConfigProvider>
        </div>
      </div>

      {/* 특이사항 */}
      <div className="ActivityContent_option">
        <div className="ActivityContent_text">특이사항</div>
        <ConfigProvider theme={theme}>
          <TextArea rows={6} disabled value={note} />
        </ConfigProvider>
      </div>

      {/* 피드백 작성 */}
      <div className="ActivityContent_feedback">
        <Button className="ActivityContent_feedback_btn" onClick={feedback}>
          피드백 작성
        </Button>
      </div>
      <Modal
        title="피드백 제출"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FeedBackModal activityid={id} onClose={handleCancel} />
      </Modal>
    </ActivityContentStyled>
  );
};

export default ActivityContent;
