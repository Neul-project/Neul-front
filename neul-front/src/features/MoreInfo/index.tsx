import { MoreInfoStyled } from "./styled";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { moreInfoValidation } from "@/utils/joinValidation";

import axiosInstance from "@/lib/axios";
import axios from "axios";

import { useAuthStore } from "@/stores/useAuthStore";
import { message, notification } from "antd";

const MoreInfoCompo = () => {
  const router = useRouter();

  const { login } = useAuthStore();

  const [isPhoneChecked, setIsPhoneChecked] = useState(false);

  // 추가 정보 유효성 검사 및 요청
  const formik = useFormik({
    initialValues: {
      guardianName: "",
      guardianPhone: "",
      wardName: "",
      gender: "male",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      note: "",
    },
    validationSchema: moreInfoValidation,
    onSubmit: async (values) => {
      if (!isPhoneChecked) {
        message.info("전화번호 중복 확인을 해주세요.");
        return;
      }

      // 보호자 정보
      const guardian = {
        name: values.guardianName,
        phone: values.guardianPhone,
      };

      // 피보호자 정보
      const ward = {
        name: values.wardName,
        gender: values.gender,
        birth: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
        note: values.note,
      };

      // console.log(guardian);
      // console.log(ward);

      try {
        const [guardianRes, wardRes] = await Promise.all([
          axiosInstance.post("/user/info", guardian),
          axiosInstance.post("/patient/info", ward),
        ]);

        // console.log("MoreInfo guardianRes", guardianRes.data);
        // console.log("MoreInfo wardRes", wardRes.data);

        if (guardianRes.data?.ok === true && wardRes.data?.ok === true) {
          notification.success({
            message: "등록 성공",
            description: "등록이 완료되었습니다.",
          });

          // 사용자가 입력한 이름 즉시 헤더에 반영
          const meRes = await axiosInstance.get("/auth/me");
          // console.log("소셜유저 정보:", meRes.data);

          // // 3. zustand에 로그인 상태 저장
          login(meRes.data);

          router.push("/");
        } else {
          notification.error({
            message: "등록 실패",
            description: "등록에 실패했습니다. 다시 시도해주세요.",
          });
        }
      } catch (err) {
        console.error("등록 오류:", err);
        notification.error({
          message: "중복 확인 실패",
          description: "등록 중 오류가 발생했습니다.",
        });
      }
    },
  });

  // 전화번호 중복 검사
  const handleDuplicationCheck = async (fieldValue: string) => {
    if (!fieldValue) {
      message.info("휴대전화번호를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/check?phone=${fieldValue}`
      );

      if (res.data.isDuplicate) {
        message.info("이미 등록된 전화번호입니다.");
      } else {
        notification.success({
          message: "중복 확인 성공",
          description: "사용 가능한 전화번호입니다.",
        });
        setIsPhoneChecked(true);
      }
    } catch (error) {
      console.error("중복 확인 오류", error);
      notification.error({
        message: "중복 확인 실패",
        description: "중복 확인 중 오류가 발생했습니다.",
      });
    }
  };

  // 전화번호 값이 변경되면 중복확인 리셋
  useEffect(() => {
    setIsPhoneChecked(false);
  }, [formik.values.guardianPhone]);

  return (
    <MoreInfoStyled>
      <div className="MoreInfo_container">
        <div className="MoreInfo_title">
          <div>추가 정보 입력</div>
          <p>원활한 서비스 이용을 위해 추가정보를 입력해주세요.</p>
        </div>
        <div className="MoreInfo_midTitle">
          <span className="MoreInfo_essential">*</span> 필수입력사항
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* 보호자 정보 */}
          <div className="MoreInfo_section">
            <h4 className="MoreInfo_sectionTitle">보호자 정보</h4>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">
                보호자 이름<span className="MoreInfo_essential">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="guardianName"
                  className="MoreInfo_input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guardianName}
                  placeholder="보호자명을 입력해 주세요"
                />
                {formik.touched.guardianName && formik.errors.guardianName && (
                  <div className="MoreInfo_error">
                    {formik.errors.guardianName}
                  </div>
                )}
              </div>
            </div>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">
                휴대전화번호<span className="MoreInfo_essential">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="guardianPhone"
                  className="MoreInfo_input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guardianPhone}
                  placeholder="숫자만 입력해주세요"
                  maxLength={11}
                />
                {formik.touched.guardianPhone &&
                  formik.errors.guardianPhone && (
                    <div className="MoreInfo_error">
                      {formik.errors.guardianPhone}
                    </div>
                  )}
              </div>
              <div className="MoreInfo_dup">
                <button
                  type="button"
                  onClick={() => {
                    handleDuplicationCheck(formik.values.guardianPhone);
                  }}
                >
                  중복확인
                </button>
              </div>
            </div>
          </div>

          <hr />

          {/* 피보호자 정보 */}
          <div className="MoreInfo_section">
            <h4 className="MoreInfo_sectionTitle border">피보호자 정보</h4>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">
                피보호자 이름<span className="MoreInfo_essential">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="wardName"
                  className="MoreInfo_input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.wardName}
                  placeholder="피보호자명을 입력해 주세요"
                />
                {formik.touched.wardName && formik.errors.wardName && (
                  <div className="MoreInfo_error">{formik.errors.wardName}</div>
                )}
              </div>
            </div>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">
                생년월일<span className="MoreInfo_essential">*</span>
              </label>
              <div className="MoreInfo_birthInput">
                <div>
                  <div className="MoreInfo_birth">
                    <input
                      type="text"
                      name="birthYear"
                      placeholder="YYYY"
                      className="MoreInfo_inputSmall"
                      value={formik.values.birthYear}
                      onChange={formik.handleChange}
                      maxLength={4}
                    />
                    <span>/</span>
                    <input
                      type="text"
                      name="birthMonth"
                      placeholder="MM"
                      className="MoreInfo_inputSmall"
                      value={formik.values.birthMonth}
                      onChange={formik.handleChange}
                      maxLength={2}
                    />
                    <span>/</span>
                    <input
                      type="text"
                      name="birthDay"
                      placeholder="DD"
                      className="MoreInfo_inputSmall"
                      value={formik.values.birthDay}
                      onChange={formik.handleChange}
                      maxLength={2}
                    />
                  </div>
                  {(formik.touched.birthYear ||
                    formik.touched.birthMonth ||
                    formik.touched.birthDay) &&
                    (formik.errors.birthYear ||
                      formik.errors.birthMonth ||
                      formik.errors.birthDay) && (
                      <div className="MoreInfo_error">
                        생년월일을 올바르게 입력하세요
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">
                성별<span className="MoreInfo_essential">*</span>
              </label>
              <div className="MoreInfo_radioGroup">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={formik.handleChange}
                  />{" "}
                  남자
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={formik.handleChange}
                  />{" "}
                  여자
                </label>
              </div>
            </div>

            <div className="MoreInfo_inputGroup">
              <label className="MoreInfo_label">특이사항</label>
              <textarea
                name="note"
                className="MoreInfo_textarea"
                placeholder="특이사항이 있다면 작성해주세요"
                value={formik.values.note}
                onChange={formik.handleChange}
                rows={4}
              />
            </div>
          </div>

          <div className="MoreInfo_subBtn">
            <button type="submit">등록하기</button>
          </div>
        </form>
      </div>
    </MoreInfoStyled>
  );
};

export default MoreInfoCompo;
