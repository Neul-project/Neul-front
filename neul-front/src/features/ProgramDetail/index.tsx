import { useEffect, useState } from "react";
import { ProgramDetailStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import clsx from "clsx";
import { useAuthStore } from "@/stores/useAuthStore";

//프로그램 상세 페이지 컴포넌트
const ProgramDetail = (props: { detailid: string }) => {
  //변수 선언
  const { detailid } = props;
  const { user } = useAuthStore();
  //useState
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [manager, setManager] = useState();
  const [call, setCall] = useState();
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [progress, setProgress] = useState();
  const [recruitment, setRecruitment] = useState();
  const [registration, setRegistration] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    //id에 해당하는 프로그램 상세 전체 보기
    axiosInstance
      .get(`/program/detail`, { params: { id: detailid } })
      .then((res) => {
        //console.log("detail res", res.data);
        const data = res.data;
        setTitle(data.name);
        setCall(data.call);
        setImg(data.img);
        setManager(data.manager);
        setCapacity(data.capacity);
        setPrice(data.price);
        setProgress(data.progress);
        setRecruitment(data.recruitment);
        setRegistration(data.registration_at);
        setCategory(data.category);
      });
  }, []);

  const applyProgram = () => {
    axiosInstance
      .post("/program/apply", {
        params: { userId: user?.id, programId: Number(detailid) },
      })
      .then((res) => {
        console.log("신청 성공");
      });
  };

  return (
    <ProgramDetailStyled className={clsx("ProgramDetail_main_wrap")}>
      <div>{title}</div>
      <div className="ProgramDetail_main">
        <div>이미지</div>
        <div>
          <div className="ProgramDetail_row">
            <div>가격</div>
            <div>{price}</div>
          </div>
          <div className="ProgramDetail_row">
            <div>진행기간</div>
            <div>{progress}</div>
          </div>
          <div className="ProgramDetail_row">
            <div>모집기간</div>
            <div>{recruitment}</div>
          </div>
          <div className="ProgramDetail_row">
            <div>카테고리</div>
            <div>{category}</div>
          </div>
          <div className="ProgramDetail_row">
            <div>모집인원</div>
            <div>{capacity}</div>
          </div>
          <div className="ProgramDetail_row">
            <div>문의</div>
            <div>{call}</div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={applyProgram}>신청하기</button>
        <button>목록보기</button>
      </div>
    </ProgramDetailStyled>
  );
};

export default ProgramDetail;
