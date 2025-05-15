import clsx from "clsx";
import { NoteBookStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import StatusCheck from "@/components/StatusCheck";
import Head from "next/head";
import OnePage from "../OnePage";

const NoteBook = () => {
  const [name, setName] = useState<string>(""); // 피보호자 이름
  const lineNum = Array(8).fill(0);

  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) return;

    // 피보호자 이름은 1번만 불러옴
    axiosInstance
      .get("/patient/name", {
        params: { userId },
      })
      .then((res) => {
        setName(res.data.name);
        console.log("피보호자이름", res.data.name);
      })
      .catch((e) => {
        console.error("피보호자 이름 불러오기 실패:", e);
      });
  }, [userId]);

  const content = (
    <div className="statuscheck_explanation">
      <p>
        <strong>컨디션 기준</strong> <br />
        - 아주 좋음: 피보호자가 매우 건강하고 활동적임. <br />
        - 좋음: 건강하지만 약간의 피로감을 느낄 수 있음. <br />
        - 보통: 특별한 문제가 없지만 조금 피곤해 보임. <br />
        - 나쁨: 건강 상태가 좋지 않거나 피로가 심함. <br />- 아주 나쁨:
        피보호자의 상태가 매우 나쁘고, 즉각적인 관리가 필요함.
      </p>
      <br />
      <p>
        <strong>식사량 기준</strong> <br />
        - 완식: 식사를 모두 섭취함. <br />
        - 대부분 섭취: 식사량의 80% 이상 섭취함. <br />
        - 절반 섭취: 식사량의 50% 정도 섭취함. <br />
        - 조금 섭취: 식사량의 30% 미만 섭취함. <br />- 식사 거부: 식사를
        거부하거나 거의 섭취하지 않음.
      </p>
    </div>
  );

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          rel="stylesheet"
        />
      </Head>

      <NoteBookStyled className={clsx("notebook_wrap")}>
        <div className="notebook_box">
          {/* 왼쪽 페이지 */}
          <OnePage
            type="left"
            lineNum={lineNum}
            name={name}
            popoverContent={content}
          />

          {/* 오른쪽 페이지 */}
          <OnePage type="right" lineNum={lineNum}>
            <StatusCheck />
          </OnePage>
        </div>
      </NoteBookStyled>
    </>
  );
};

export default NoteBook;
