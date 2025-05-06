import { MoreInfoStyled } from "./styled";

import { useFormik } from "formik";
import { moreInfoValidation } from "@/utils/joinValidation";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/router";

const MoreInfoCompo = () => {
  const router = useRouter();

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

      console.log(guardian);
      console.log(ward);

      try {
        const [guardianRes, wardRes] = await Promise.all([
          axiosInstance.post("/user/info", guardian),
          axiosInstance.post("/patient/info", ward),
        ]);

        if (guardianRes.data?.ok === true && wardRes.data?.ok === true) {
          alert("등록이 완료되었습니다.");
          router.push("/");
        } else {
          alert("등록에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (err) {
        console.error("등록 오류:", err);
        alert("등록 중 오류가 발생했습니다.");
      }
    },
  });

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
                전화번호<span className="MoreInfo_essential">*</span>
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
                  {(formik.errors.birthYear ||
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
