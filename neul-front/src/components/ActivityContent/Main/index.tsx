import { ActivityContentStyled } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

//antd
import { Select, Radio, Input, Button, Modal } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";

const { TextArea } = Input;

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

//image
import img1 from "@/assets/images/main01_deco.gif";
import img2 from "@/assets/images/main02_deco.gif";
import img3 from "@/assets/images/main03_deco.gif";
import FeedBackModal from "@/features/FeedBackModal";

//활동 기록 컴포넌트
const ActivityContent = (props: { id: string }) => {
  //변수 선언
  const { id } = props;
  const imgarr = [img1, img2, img3];
  const [rehabilitation, setRehabilitation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(""); //제목
  const [img, setImg] = useState([""]); //이미지 배열
  //const [re, setRe] = useState(""); //활동종류
  const [type, setType] = useState(""); //재활치료
  const [note, setNote] = useState("");

  //useEffect
  useEffect(() => {
    const userId = 1;
    //활동기록리스트 id와 userId에 따른 내용 전체 확인
    axiosInstance
      .get(`/activity/detail`, {
        params: { userId: userId, id: id },
      })
      .then((res) => {
        //console.log("res", res.data);
        const data = res.data;
        setTitle(data.title);
        setImg(data.img);
        setRehabilitation(data.rehabilitation);
        setType(data.type);
        setNote(data.note);
      });
  }, []);

  const optionsWithDisabled: CheckboxGroupProps<string>["options"] = [
    { label: "참여", value: "yes", disabled: rehabilitation !== "yes" },
    { label: "미참여", value: "no", disabled: rehabilitation !== "no" },
    { label: "비대상", value: "none", disabled: rehabilitation !== "none" },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feedback = () => {
    setIsModalOpen(true);
  };

  return (
    <ActivityContentStyled className={clsx("ActivityContent_main_wrap")}>
      <h1 className="ActivityContent_title">
        <span>{title}</span> 활동기록 열람
      </h1>

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
          <SwiperSlide>
            <img
              src={imgarr[0].src}
              alt={`preview-0`}
              className="ActivityContent_swperimg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgarr[1].src}
              alt={`preview-1`}
              className="ActivityContent_swperimg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgarr[2].src}
              alt={`preview-2`}
              className="ActivityContent_swperimg"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 활동 종류 & 재활 치료*/}
      <div className="ActivityContent_type">
        <div>
          <div className="ActivityContent_text">활동 종류</div>
          <Select defaultValue={type} style={{ width: 200 }} disabled />
        </div>
        <div>
          <div className="ActivityContent_text">재활 치료</div>
          <Radio.Group
            options={optionsWithDisabled}
            value={rehabilitation}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      </div>

      {/* 특이사항 */}
      <div className="ActivityContent_option">
        <div>특이사항</div>
        <TextArea rows={6} disabled value={note} />
      </div>

      {/* 피드백 작성 */}
      <div className="ActivityContent_feedback">
        <Button className="ActivityContent_feedback_btn" onClick={feedback}>
          피드백 작성
        </Button>
      </div>
      <Modal
        title="피드백 내용"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <FeedBackModal activityid={id} />
      </Modal>
    </ActivityContentStyled>
  );
};

export default ActivityContent;
