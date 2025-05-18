import { useEffect, useState } from "react";
import { ProgramDetailStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import clsx from "clsx";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, ConfigProvider, Modal, notification } from "antd";
import ProgramImg from "../ProgramImg";
import ProgramContent from "../ProgramContent";
import { useRouter } from "next/router";
import { getRecruitmentState } from "@/utils/getrecruitmentstate";
import { useCartStore } from "@/stores/useCartStore";
import { GreenTheme } from "@/utils/antdtheme";

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
  const [capacity, setCapacity] = useState<number>(0);
  const [price, setPrice] = useState();
  const [progress, setProgress] = useState();
  const [recruitment, setRecruitment] = useState();
  const [registration, setRegistration] = useState();
  const [category, setCategory] = useState();
  const [target, setTarget] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState("");
  const [total, setTotal] = useState<number>(0); //현재 백엔드에 저장된 프로그램 신청 인원 수

  useEffect(() => {
    if (!detailid) return;
    //id에 해당하는 프로그램 상세 전체 보기
    axiosInstance
      .get(`/program/detail`, { params: { detailid: Number(detailid) } })
      .then((res) => {
        const data = res.data;
        //console.log("Data", data);
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

    //해당 프로그램id에 해당하는 신청한 사람 개수 반환
    axiosInstance
      .get("/program/paylist", {
        params: { detailid: Number(detailid) },
      })
      .then((res) => {
        //console.log("res", res.data);
        setTotal(res.data);
      });
  }, [detailid]);

  useEffect(() => {
    if (!recruitment) return;

    const result = getRecruitmentState(recruitment);
    //if (result) setState(result);
    if (total >= capacity) {
      setState("모집완료");
    } else if (result) {
      setState(result);
    }
  }, [recruitment, total]);

  const Columnlist = () => {
    router.push("/program");
  };

  const showModal = () => {
    if (total >= capacity) {
      //console.log("실행되면 안됨");
      notification.info({
        message: `모집인원 마감`,
        description: `모집 인원이 마감되어 신청하실 수 없습니다.`,
      });
    } else {
      setIsModalOpen(true);
    }
  };

  //바로 결제하기 모달
  const showdirectModal = () => {
    //console.log("de", detailid);

    //console.log("T", total, capacity);
    if (total < capacity) {
      setIsDirectModalOpen(true);
    } else {
      //console.log("실행되면 안됨");
      notification.info({
        message: `모집인원 마감`,
        description: `모집 인원이 마감되어 신청하실 수 없습니다.`,
      });
    }
  };

  const handleOk = () => {
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
          .then(async (res) => {
            //console.log("신청 성공");

            await useCartStore.getState().fetchCartCount();

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
    handleOk();
    router.push("/payment");
    setIsDirectModalOpen(false);
    //결제 폼 열기
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDirectModalOpen(false);
  };

  return (
    <ProgramDetailStyled className={clsx("ProgramDetail_main_wrap")}>
      <div className="ProgramDetail_top">
        <div
          className={`ProgramDetail_ing ${
            state === "모집완료" || state === "모집예정"
              ? "ProgramDetail_ing_end"
              : ""
          }`}
        >
          {state}
        </div>
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
            manager={manager ?? ""}
            total={total ?? ""}
          />
        </div>
      </div>

      <div className="ProgramDetail_btns">
        <button
          onClick={showdirectModal}
          className={`ProgramDetail_Dir ${
            state === "모집완료" || state === "모집예정" ? "disabled" : ""
          }`}
          disabled={state === "모집완료"}
        >
          바로 결제하기
        </button>
        <Modal
          title="바로 결제하기"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isDirectModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <ConfigProvider theme={GreenTheme}>
              <Button key="link" type="primary" onClick={DirecthandleOk}>
                결제하기
              </Button>
            </ConfigProvider>
          }
        >
          <div>정말로 바로 결제하시겠습니까?</div>
        </Modal>

        <button
          className={`ProgramDetail_show ${
            state === "모집완료" || state === "모집예정" ? "disabled" : ""
          }`}
          onClick={showModal}
          disabled={state === "모집완료"}
        >
          신청하기
        </button>

        <Modal
          title="프로그램 신청하기"
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            <ConfigProvider theme={GreenTheme}>
              <Button key="link" type="primary" onClick={handleOk}>
                신청하기
              </Button>
            </ConfigProvider>
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
