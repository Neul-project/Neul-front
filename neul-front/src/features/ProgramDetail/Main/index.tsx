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

//image
import share from "@/assets/images/share.png";
declare global {
  interface Window {
    Kakao: any;
  }
}

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

  const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  useEffect(() => {
    const loadKakaoSdk = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };

    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = loadKakaoSdk;
      document.body.appendChild(script);
    } else {
      loadKakaoSdk();
    }
  }, []);

  const kakaoShare = () => {
    if (!window.Kakao) return;
    const url = window.location.href;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: "",
        imageUrl: process.env.NEXT_PUBLIC_BASE_URL + "/uploads/image/" + img[0],
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },

      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

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
    setState(result!);
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
    axiosInstance.get("/program/histories").then((res: any) => {
      const list = res.data;
      console.log("his", list);
      //장바구니에 있는지 확인
      const incart = list.filter((item: any) => {
        return item.payment_status === "결제 대기";
      });

      //결제 완료
      const endpay = list.filter((item: any) => {
        return item.payment_status === "결제 완료";
      });

      //중복 신청 확인
      const alreadyApplied = list.some(
        (element: any) => element.id === Number(detailid)
      );

      if (alreadyApplied) {
        //이미 결제한 경우
        //console.log("in", incart[0].id);
        if (incart.length > 0 && incart[0].id === Number(detailid)) {
          notification.info({
            message: `신청 완료`,
            description: `이미 신청한 프로그램 입니다. 결제를 진행해 주세요.`,
          });
          setIsModalOpen(false);
          setIsDirectModalOpen(false);
        } else if (endpay.length > 0 && endpay[0].id === Number(detailid)) {
          //이미 구매한 경우
          notification.info({
            message: `신청 완료`,
            description: `이미 신청한 프로그램 입니다.`,
          });
          setIsModalOpen(false);
          setIsDirectModalOpen(false);
        }
      } else {
        console.log("die", detailid);

        axiosInstance
          .post("/program/apply", { id: Number(detailid) })
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
    //handleOk();

    //결제 내역
    axiosInstance.get("/program/histories").then((res) => {
      const list = res.data;
      //console.log("list", list);

      /*해당 프로그램 아이디와 같은 행을 찾아서 그 행에 해당하는 
      list.payment_status가 결제 대기인 경우에는 장바구니로 이동할것
      */

      //장바구니에 있는지 확인
      const incart = list.filter((item: any) => {
        return item.payment_status === "결제 대기";
      });

      //결제 완료
      const endpay = list.filter((item: any) => {
        return item.payment_status === "결제 완료";
      });

      //중복 신청 확인 - 결제 상태를 나타냄(결제 대기 || 결제 완료)
      const alreadyApplied = list.some(
        (element: any) => element.id === Number(detailid)
      );

      //alreadyApplied가 true이면 이미 신청한거임
      //console.log("incart", incart);

      if (alreadyApplied) {
        //이미 결제한 경우
        if (incart.length > 0 && incart[0].id === Number(detailid)) {
          //장바구니에 있는 경우 - 결제 대기 상태
          notification.info({
            message: `신청 완료`,
            description: `이미 신청한 프로그램 입니다. 결제를 진행해 주세요.`,
          });
          setIsModalOpen(false);
          setIsDirectModalOpen(false);
          router.push("/payment");
        } else if (endpay.length > 0 && endpay[0].id === Number(detailid)) {
          //이미 구매한 경우
          notification.info({
            message: `신청 완료`,
            description: `이미 신청한 프로그램 입니다. `,
          });
          setIsModalOpen(false);
          setIsDirectModalOpen(false);
        }
      } else {
        //장바구니에도 없고 결제도 하지 않는 상태
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
            router.push("/payment");
            setIsDirectModalOpen(false);
          });
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDirectModalOpen(false);
  };

  return (
    <ProgramDetailStyled className={clsx("ProgramDetail_main_wrap")}>
      <div className="ProgramDetail_top">
        <div className="ProgramDetail_top_left">
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
        <div className="ProgramDetail_share" onClick={kakaoShare}>
          <img className="ProgramDetail_imgstyle" src={share.src} alt="share" />
        </div>
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
