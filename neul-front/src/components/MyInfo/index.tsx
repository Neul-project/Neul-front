import { MyInfoStyled } from "./styled";
import ModalCompo from "../ModalCompo";
import Address from "../Address";
import * as S from "@/components/ModalCompo/ModalContent";

import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";

import { changePwValidation } from "@/utils/userValidation";
import { formatPhoneNumber } from "@/utils/formatter";
import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

import { useAuthStore } from "@/stores/useAuthStore";

import Script from "next/script";
import { Modal, notification } from "antd";

type UserInfoType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const MyInfo = () => {
  // zustand 로그인 유저 정보 가져오기
  const { user } = useAuthStore();
  // console.log(user); // {id, name, provider}

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  // console.log("userInfo", userInfo);

  // 모달 DOM 참조용
  const modalRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 닫기
  useOutsideClick(modalRef, () => setShowOpen(false));

  // 내 정보 요청
  const fetchMyInfo = async () => {
    try {
      const res = await axiosInstance.get("/user/info");

      // console.log("내 정보 : ", res.data);

      const { name, email, phone, address } = res.data;
      setUserInfo({ name, email, phone, address });
    } catch (error) {
      console.error("내 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  // 비밀번호 변경 요청
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePwValidation,
    onSubmit: async (values) => {
      // console.log("비밀번호 변경요청", values);

      try {
        const res = await axiosInstance.patch("/auth/password", {
          email: userInfo?.email,
          newPassword: values.password,
        });

        if (res.data?.ok) {
          notification.error({
            message: "비밀번호 변경 성공",
            description: "비밀번호가 성공적으로 변경되었습니다.",
          });
          setShowOpen(false);
        } else {
          notification.error({
            message: "비밀번호 변경 실패",
            description: "비밀번호 변경에 실패했습니다.",
          });
        }
      } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        notification.error({
          message: "비밀번호 변경 실패",
          description: "서버 오류가 발생했습니다.",
        });
      }
    },
  });

  // 회원탈퇴 요청
  const handleWithdraw = async () => {
    Modal.confirm({
      title: "정말 회원을 탈퇴하시겠습니까?",
      content: "삭제시 이용중 기록된 모든 내용은 복구할 수 없습니다.",
      okText: "네",
      cancelText: "아니요",
      centered: true, // 가운데 정렬
      okButtonProps: {
        style: { backgroundColor: "#5DA487" },
      },
      cancelButtonProps: {
        style: { color: "#5DA487" },
      },
      async onOk() {
        try {
          const res = await axiosInstance.delete("/user/withdraw", {
            data: { userId: user?.id },
          });

          // console.log("회원탈퇴", res.data);

          if (res.data.ok) {
            // access_token, refresh_token 제거 및 zustand 상태 초기화
            useAuthStore.getState().logout();

            notification.success({
              message: "회원탈퇴 성공",
              description: "그동안 이용해주셔서 감사합니다.",
            });
            router.push("/");
          } else {
            notification.error({
              message: "회원탈퇴 실패",
              description:
                "진행중인 매칭이 존재하여 탈퇴에 실패했습니다.매칭이 모두 종료된 후에 탈퇴를 시도해주세요.",
            });
          }
        } catch (err: any) {
          console.error("회원탈퇴 오류:", err);
        }
      },
    });
  };

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      <MyInfoStyled>
        <div className="MyInfo_container">
          <div className="MyInfo_flex">
            <div className="MyInfo_cont">
              <div className="MyInfo_name">
                <span>{userInfo?.name}</span>님
              </div>
              <div className="MyInfo_email">{userInfo?.email}</div>
            </div>

            {/* 로컬로그인일 경우만 보임 */}
            {user?.provider === "local" && (
              <div className="MyInfo_changePw">
                <button type="button" onClick={() => setShowOpen(true)}>
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>

          {/* 비밀번호 변경 모달 */}
          {showOpen && (
            <ModalCompo onClose={() => setShowOpen(false)}>
              <div ref={modalRef}>
                <S.ModalFormWrap onSubmit={formik.handleSubmit}>
                  <S.ModalTitle>비밀번호 변경</S.ModalTitle>

                  <S.ModalInputDiv>
                    <S.ModalInput
                      type="password"
                      name="password"
                      placeholder="새로운 비밀번호를 입력해주세요"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="error">{formik.errors.password}</div>
                    )}
                  </S.ModalInputDiv>
                  <S.ModalInputDiv>
                    <S.ModalInput
                      type="password"
                      name="confirmPassword"
                      placeholder="비밀번호를 확인해주세요"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="error">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </S.ModalInputDiv>

                  <div>
                    <S.ModalButton type="submit">변경하기</S.ModalButton>
                  </div>
                </S.ModalFormWrap>
              </div>
            </ModalCompo>
          )}

          <div className="MyInfo_phone">
            <div className="title">휴대전화번호</div>
            <div className="phone">
              {userInfo?.phone ? formatPhoneNumber(userInfo.phone) : ""}
            </div>
          </div>

          <div className="MyInfo_flex MyInfo_address">
            <div>
              <div className="MyInfo_address2">
                주소 관리
                <span className="MyInfo_address_exist">
                  {userInfo?.address
                    ? userInfo.address
                    : "등록된 주소가 없습니다"}
                </span>
              </div>
            </div>
            <div className="MyInfo_changePw">
              <button type="button" onClick={() => setIsOpen(true)}>
                {userInfo?.address ? "주소 수정" : "주소 등록"}
              </button>
            </div>
          </div>
        </div>

        {/* 주소 등록 버튼 */}
        {isOpen && (
          <Address
            onClose={() => setIsOpen(false)}
            onAddressSaved={fetchMyInfo}
            addressProps={userInfo?.address || ""}
          />
        )}

        <div>
          <button
            className="MyInfo_withDraw"
            type="button"
            onClick={handleWithdraw}
          >
            회원탈퇴
          </button>
        </div>
      </MyInfoStyled>
    </>
  );
};

export default MyInfo;
