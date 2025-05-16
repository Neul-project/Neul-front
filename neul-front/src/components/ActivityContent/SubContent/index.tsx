import { SubContentStyled, theme } from "./styled";
import { getActivityLabel } from "@/utils/activityoptionlist";

//antd
import { Select, Radio, Input, Button, Modal, ConfigProvider } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

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
}) => {
  const { type, rehabilitation, note, id } = props;
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

  return (
    <SubContentStyled className={clsx("SubContent_main_wrap")}>
      <div className="SubContent_type">
        <div>
          <div className="SubContent_text">활동 종류</div>
          <ConfigProvider theme={theme}>
            <Select
              value={getActivityLabel(type)}
              style={{ width: 200 }}
              disabled
            />
          </ConfigProvider>
        </div>
        <div>
          <div className="SubContent_text">재활 치료</div>
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
      <div className="SubContent_option">
        <div className="SubContent_text">특이사항</div>
        <ConfigProvider theme={theme}>
          <TextArea rows={6} disabled value={note} />
        </ConfigProvider>
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
    </SubContentStyled>
  );
};

export default SubContent;
