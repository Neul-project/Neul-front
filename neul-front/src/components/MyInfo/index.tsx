import { MyInfoStyled } from "./styled";
import ModalCompo from "../ModalCompo";
import Address from "../Address";

import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { useFormik } from "formik";

import { changePwValidation } from "@/utils/joinValidation";

import { useAuthStore } from "@/stores/useAuthStore";

const MyInfo = () => {
  // zustand 데이터 가져오기
  const { user } = useAuthStore();
  console.log(user); // {id, name, provider}

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);

  // 비밀번호 변경 요청
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePwValidation,
    onSubmit: async (values) => {
      console.log("비밀번호 변경요청", values);

      try {
        const res = await axiosInstance.patch("/auth/password", {
          newPassword: values.password,
        });

        if (res.data?.ok) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setPwOpen(false);
        } else {
          alert("비밀번호 변경에 실패했습니다.");
        }
      } catch (error) {
        console.error("비밀번호 변경 오류:", error);
        alert("서버 오류가 발생했습니다.");
      }
    },
  });

  // 회원탈퇴 요청
  const handleWithdraw = async () => {
    const confirmed = confirm("정말 회원을 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await axiosInstance.delete("/user/withdraw");

      if (res.data?.ok === true) {
        Cookies.remove("access_token");

        // 소셜 로그인 사용자일 경우 refresh_token도 제거
        if (Cookies.get("refresh_token")) {
          Cookies.remove("refresh_token");
        }

        alert("탈퇴가 완료되었습니다.");
        router.push("/");
      } else {
        alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err: any) {
      console.error("회원탈퇴 오류:", err);
    }
  };

  return (
    <MyInfoStyled>
      <div className="MyInfo_container">
        <div className="MyInfo_flex">
          <div className="MyInfo_cont">
            <div className="MyInfo_name">
              <span>홍길동</span>님
            </div>
            <div className="MyInfo_email">abcd@abcd.com</div>
          </div>

          {/* 로컬로그인일 경우만 보임 */}
          {user?.provider === "local" && (
            <div className="MyInfo_changePw">
              <button type="button" onClick={() => setPwOpen(true)}>
                비밀번호 변경
              </button>
            </div>
          )}
        </div>

        {/* 비밀번호 변경 모달 */}
        {pwOpen && (
          <ModalCompo onClose={() => setPwOpen(false)}>
            <form
              onSubmit={formik.handleSubmit}
              className="MyInfo_CngPWContainer"
            >
              <div className="MyInfo_CngPWTitle">비밀번호 변경</div>

              <div className="MyInfo_CngPWInput">
                <input
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
              </div>
              <div className="MyInfo_CngPWInput">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 확인해주세요"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  )}
              </div>

              <div className="MyInfo_CngPWSub">
                <button type="submit">변경하기</button>
              </div>
            </form>
          </ModalCompo>
        )}

        <div className="MyInfo_phone">
          <div className="title">휴대전화번호</div>
          <div className="phone">010-1111-1111</div>
        </div>

        <div className="MyInfo_flex MyInfo_address">
          <div>주소 관리</div>
          <div className="MyInfo_changePw">
            <button type="button" onClick={() => setIsOpen(true)}>
              주소 등록
            </button>
          </div>
        </div>
      </div>

      {/* 주소 등록 버튼 */}
      {isOpen && <Address onClose={() => setIsOpen(false)} />}

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
  );
};

export default MyInfo;
