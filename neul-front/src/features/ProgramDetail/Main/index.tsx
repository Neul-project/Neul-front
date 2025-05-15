import { useEffect, useState } from "react";
import { ProgramDetailStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import clsx from "clsx";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, Modal, notification } from "antd";
import ProgramImg from "../ProgramImg";
import ProgramContent from "../ProgramContent";
import { useRouter } from "next/router";

//프로그램 상세 페이지 컴포넌트
const ProgramDetail = (props: { detailid: string }) => {
  //변수 선언
  const { detailid } = props;
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false); //신청하기 모달
  const [isDirectModalOpen, setIsDirectModalOpen] = useState(false); //바로 결제하기 모달
  const router = useRouter();

  //useState
  const [title, setTitle] = useState();
  const [img, setImg] = useState([""]);
  const [manager, setManager] = useState();
  const [call, setCall] = useState();
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [progress, setProgress] = useState();
  const [recruitment, setRecruitment] = useState();
  const [registration, setRegistration] = useState();
  const [category, setCategory] = useState();
  const [target, setTarget] = useState("");
  const [note, setNote] = useState("");
  //console.log("detailid", detailid);

  useEffect(() => {
    if (!detailid) return;
    //id에 해당하는 프로그램 상세 전체 보기
    axiosInstance
      .get(`/program/detail`, { params: { detailid: Number(detailid) } })
      .then((res) => {
        const data = res.data;
        console.log("Data", data);
        const imgarr = data.img.split(",");
        setTitle(data.name);
        setCall(data.call);
        setImg(imgarr);
        setManager(data.manager);
        setCapacity(data.capacity);
        setPrice(data.price);
        setProgress(data.progress);
        setRecruitment(data.recruitment);
        setRegistration(data.registration_at);
        setCategory(data.category);
        setTarget(data.target);
        setNote(data.note);
      });
  }, [detailid]);

  const Columnlist = () => {
    router.push("/program");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  //바로 결제하기 모달
  const showdirectModal = () => {
    setIsDirectModalOpen(true);
  };

  const handleOk = () => {
    //console.log("de", Number(detailid));

    //장바구니에 있는 지 확인용
    axiosInstance.get("/program/histories").then((res) => {
      const list = res.data;

      //중복 신청 확인
      const alreadyApplied = list.some(
        (element: any) => element.id === Number(detailid)
      );

      if (alreadyApplied) {
        notification.info({
          message: `신청 실패`,
          description: `이미 신청한 프로그램 입니다.`,
        });
        setIsModalOpen(false);
      } else {
        axiosInstance
          .post("/program/apply", { programId: Number(detailid) })
          .then((res) => {
            //console.log("신청 성공");

            notification.success({
              message: `신청 완료`,
              description: `성공적으로 신청 완료 되었습니다. 결제까지 진행하셔야 프로그램이 등록됩니다.`,
            });
            setIsModalOpen(false);
          });
      }
    });
  };

  //바로 결제 확인 버튼
  const DirecthandleOk = () => {
    setIsDirectModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDirectModalOpen(false);
  };

  return (
    <ProgramDetailStyled className={clsx("ProgramDetail_main_wrap")}>
      <div className="ProgramDetail_top">
        <div className="ProgramDetail_ing">접수중</div>
        <h3 className="ProgramDetail_title">{title}</h3>
      </div>
      <div className="ProgramDetail_main">
        <div className="ProgramDetail_img">
          <ProgramImg imgarr={img} />
        </div>
        <div className="ProgramDetail_content">
          <ProgramContent
            price={price ?? ""}
            progress={progress ?? ""}
            recruitment={recruitment ?? ""}
            category={category ?? ""}
            capacity={capacity ?? ""}
            call={call ?? ""}
            target={target ?? ""}
            note={note ?? ""}
          />
        </div>
      </div>

      <div className="ProgramDetail_btns">
        <button onClick={showdirectModal} className="ProgramDetail_Dir">
          바로 결제하기
        </button>
        <Modal
          title="바로 결제하기"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isDirectModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Button key="link" type="primary" onClick={DirecthandleOk}>
              결제하기
            </Button>
          }
        >
          <div>정말로 바로 결제하시겠습니까?</div>
        </Modal>

        <button className="ProgramDetail_show" onClick={showModal}>
          신청하기
        </button>

        <Modal
          title="프로그램 신청하기"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <Button key="link" type="primary" onClick={handleOk}>
              신청하기
            </Button>
          }
        >
          <div>정말로 신청하시겠습니까?</div>
        </Modal>
        <button className="ProgramDetail_show" onClick={Columnlist}>
          목록보기
        </button>
      </div>
    </ProgramDetailStyled>
  );
};

export default ProgramDetail;
