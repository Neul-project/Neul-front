import { WardInfoStyled } from "./styled";
import ModalCompo from "../ModalCompo";
import * as S from "@/components/ModalCompo/ModalContent";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "@/lib/axios";

import { formatAge } from "@/utils/formatter";
import { notification } from "antd";

import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type UserInfoType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  ward: {
    name: string;
    gender: "male" | "female";
    birth: string; // yyyy-mm-dd
    note?: string;
  };
};

const WardInfo = () => {
  const [wardOpen, setwardOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  console.log("보호자+피보호자 : ", userInfo);

  // 모달 DOM 참조용
  const modalRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 닫기
  useOutsideClick(modalRef, () => setwardOpen(false));

  // 보호자 + 피보호자 정보 요청
  useEffect(() => {
    const fetchWardInfo = async () => {
      try {
        const res = await axiosInstance.get("/patient/info");
        setUserInfo(res.data);
      } catch (error) {
        console.error("피보호자 정보 불러오기 실패:", error);
      }
    };
    fetchWardInfo();
  }, []);

  // 피보호자 정보 수정 요청
  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "male",
      birth: "",
      note: "",
    },
    onSubmit: async (values) => {
      // console.log("피보호자 정보 수정:", values);

      try {
        const res = await axiosInstance.patch("/patient/info", {
          note: values.note,
        });

        if (res.data?.ok) {
          notification.success({
            message: "피보호자 정보 수정 성공",
            description: "피보호자 정보가 성공적으로 수정되었습니다.",
          });
          setwardOpen(false);
          // 특이사항 즉시 반영
          setUserInfo((prev) =>
            prev
              ? {
                  ...prev,
                  ward: {
                    ...prev.ward,
                    note: values.note,
                  },
                }
              : prev
          );
        } else {
          notification.error({
            message: "피보호자 정보 수정 실패",
            description: "피보호자 정보 수정에 실패했습니다.",
          });
        }
      } catch (error) {
        console.error("피보호자 정보 수정 오류:", error);
        notification.error({
          message: "피보호자 정보 수정 오류",
          description: "서버 오류가 발생했습니다.",
        });
      }
    },
  });

  // 모달에 피보호자 정보 주입
  const handleEditOpen = () => {
    if (userInfo?.ward) {
      formik.setValues({
        name: userInfo.ward.name || "",
        gender: userInfo.ward.gender || "male",
        birth: userInfo.ward.birth || "",
        note: userInfo.ward.note || "",
      });
    }
    setwardOpen(true);
  };

  return (
    <WardInfoStyled>
      {/* 보호자 정보 */}
      <div className="WardInfo_container m-b">
        <div>
          <div className="WardInfo_name">
            <span>{userInfo?.name}</span>님
          </div>
          <div className="WardInfo_email">{userInfo?.email}</div>
        </div>
      </div>

      {/* 피보호자 정보 */}
      <div className="WardInfo_container WardInfo">
        <div className="WardInfo_wardContainer">
          <div className="WardInfo_wardTitle">피보호자 정보</div>

          <div className="WardInfo_cont">
            <div className="WardInfo_wardName">
              피보호자명: <span>{userInfo?.ward?.name} </span>
              {userInfo?.ward?.gender === "male" ? (
                <i className="fa-solid fa-mars man" />
              ) : (
                <i className="fa-solid fa-venus woman" />
              )}
            </div>
          </div>

          <div className="WardInfo_birth">
            <div className="title">생년월일:</div>
            <div>
              {userInfo?.ward?.birth} (
              {userInfo?.ward?.birth ? formatAge(userInfo.ward.birth) : "-"})
            </div>
          </div>

          <div className="WardInfo_flex WardInfo_significant">
            <div className="WardInfo_cont2">특이사항:</div>
            <div className="WardInfo_sqare">{userInfo?.ward?.note}</div>
          </div>
        </div>
      </div>

      {/* 수정 버튼 */}
      <div className="WardInfo_editBtn">
        <button type="button" onClick={handleEditOpen}>
          수정
        </button>
      </div>

      {/* 피보호자 정보 수정 모달 */}
      {wardOpen && (
        <ModalCompo onClose={() => setwardOpen(false)}>
          <div ref={modalRef}>
            <S.ModalFormWrap
              onSubmit={formik.handleSubmit}
              className="WardInfo_EditForm"
            >
              <S.ModalTitle>피보호자 정보 수정</S.ModalTitle>

              <S.ModalInputDiv>
                <S.ModalCont>피보호자명</S.ModalCont>
                <div className="readonly">{formik.values.name}</div>
              </S.ModalInputDiv>

              <div className="flex">
                <S.ModalInputDiv>
                  <S.ModalCont>성별</S.ModalCont>
                  <div className="readonly">
                    {formik.values.gender === "male" ? "남성" : "여성"}
                  </div>
                </S.ModalInputDiv>

                <S.ModalInputDiv>
                  <S.ModalCont>생년월일</S.ModalCont>
                  <div className="readonly">{formik.values.birth}</div>
                </S.ModalInputDiv>
              </div>

              <S.ModalInputDiv>
                <S.ModalCont>특이사항</S.ModalCont>
                <S.ModalTextarea
                  name="note"
                  placeholder="특이사항"
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </S.ModalInputDiv>

              <div className="MyInfo_CngPWSub">
                <S.ModalButton type="submit">수정하기</S.ModalButton>
              </div>
            </S.ModalFormWrap>
          </div>
        </ModalCompo>
      )}
    </WardInfoStyled>
  );
};

export default WardInfo;
