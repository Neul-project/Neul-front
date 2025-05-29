import { SubContentStyled } from "./styled";
import {
  getActivityLabel,
  getRehabilitation,
} from "@/utils/activityoptionlist";
import clip from "@/assets/images/clip.png";
import Image from "next/image";

//antd
import { Button, Input, Modal } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import SwiperImg from "../SwiperImg";

const FeedBackModal = dynamic(() => import("@/features/FeedBackModal"), {
  ssr: false,
});

const { TextArea } = Input;

//활동기록 내용
const SubContent = (props: {
  type: string;
  rehabilitation: string;
  note: string;
  id: string;
  img?: string[];
  title?: string;
  patientname?: string;
}) => {
  const { type, rehabilitation, note, id, img, title, patientname } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  //console.log("note", note);

  return (
    <SubContentStyled className={clsx("SubContent_main_wrap")}>
      <div className="SubContent_clip_box">
        <Image className="SubContent_clip" src={clip} alt="클립" />
      </div>
      <div className="SubContent_left">
        <SwiperImg
          img={img}
          title={title!}
          patientname={patientname!}
          styletype={"rightside"}
        />
      </div>
      <div className="SubContent_content">
        {/* 활동종류 */}
        <div className="SubContent_row">
          <span className="SubContent_text">활동 종류</span>
          <span className="SubContent_re_text">{getActivityLabel(type)}</span>
        </div>

        {/* 재활치료 */}
        <div className="SubContent_row">
          <div className="SubContent_text">재활 치료</div>
          <div className="SubContent_re_text">
            {getRehabilitation(rehabilitation)}
          </div>
        </div>

        {/* 특이사항 */}
        <div className="SubContent_row  SubContent_row_note">
          <div className="SubContent_text">특이사항</div>
          <div className="SubContent_re_text_note SubContent_re_text">
            {note}
          </div>
        </div>

        {/* 피드백 작성 */}
        <div className="SubContent_feedback">
          <Button className="SubContent_feedback_btn" onClick={feedback}>
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
      </div>
    </SubContentStyled>
  );
};

export default SubContent;
