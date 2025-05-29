import { ActivityContentStyled, theme } from "./styled";
import clsx from "clsx";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import OnePage from "@/components/OnePage";
import Head from "next/head";
import { useAuthStore } from "@/stores/useAuthStore";
import SubContent from "../SubContent";
import SwiperImg from "../SwiperImg";

//활동 기록 컴포넌트
const ActivityContent = (props: { id: string }) => {
  //변수 선언
  const { id } = props;
  const { user } = useAuthStore();
  const [rehabilitation, setRehabilitation] = useState("");
  const [title, setTitle] = useState(""); //제목
  const [img, setImg] = useState([""]); //이미지 배열
  const [type, setType] = useState(""); //재활치료
  const [note, setNote] = useState("");
  const [patientname, setPatientName] = useState("");
  const lineNumleft = Array(8).fill(0);
  const lineNumright = Array(8).fill(0);

  //useEffect
  useEffect(() => {
    if (!user?.id) return;
    if (!id) return;
    const userId = user?.id;
    //console.log("userid", userId, id);

    //활동기록리스트 id와 userId에 따른 내용 전체 확인
    axiosInstance
      .get(`/activity/selectlist`, {
        //userid : 보호자id, activityId : 해당 활동기록 아이디
        params: { userId: userId, activityId: id },
      })
      .then((res) => {
        const data = res.data[0];
        //console.log("res", data);

        const imgarr = data.img.split(",");
        setTitle(data.title);
        setRehabilitation(data.rehabilitation);
        setType(data.type);
        setNote(data.note);
        setImg(imgarr);
        setPatientName(data.patient?.name);
      });
  }, [user, id]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ActivityContentStyled className={clsx("ActivityContent_main_wrap")}>
        <div className="notebook_box">
          <OnePage
            type={"left"}
            lineNum={lineNumleft}
            activity={"swiper"}
            img={img}
            title={title}
            patientname={patientname}
          >
            <SwiperImg img={img} title={title!} patientname={patientname!} />
          </OnePage>
          <OnePage type="right" lineNum={lineNumright}>
            <SubContent
              img={img}
              title={title!}
              patientname={patientname!}
              type={type}
              rehabilitation={rehabilitation!}
              note={note!}
              id={id!}
            />
          </OnePage>
        </div>
      </ActivityContentStyled>
    </>
  );
};

export default ActivityContent;
