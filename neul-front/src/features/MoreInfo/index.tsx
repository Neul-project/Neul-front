import { MoreInfoStyled } from "./styled";

import { useFormik } from "formik";
import * as Yup from "yup";
import { moreInfoValidation } from "@/utils/joinValidation";

import axios from "axios";
import { useEffect } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

const MoreInfoCompo = () => {
  // 카카오 주소 API 스크립트 load
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
      address: "",
      addressDetail: "",
      note: "",
    },
    validationSchema: moreInfoValidation,
    onSubmit: async (values) => {
      const fullAddress = `${values.address} ${values.addressDetail}`;
      // 보호자 정보
      const guardian = {
        name: values.guardianName,
        phone: values.guardianPhone,
        address: fullAddress,
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
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/info`, guardian),
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/patient/info`, ward),
        ]);

        if (guardianRes.data?.ok === true && wardRes.data?.ok === true) {
          alert("등록이 완료되었습니다.");
        } else {
          alert("등록에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (err) {
        console.error("등록 오류:", err);
        alert("등록 중 오류가 발생했습니다.");
      }
    },
  });

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        formik.setFieldValue("address", fullAddress);
      },
    }).open();
  };

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
                주소<span className="MoreInfo_essential">*</span>
              </label>
              <div className="MoreInfo_address">
                <div>
                  <div>
                    <div style={{ marginBottom: 12 }}>
                      <input
                        type="text"
                        name="address"
                        className="MoreInfo_input"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        placeholder="주소를 입력해 주세요"
                        readOnly
                      />
                    </div>

                    {/* 상세 주소 입력란 */}
                    <div>
                      <input
                        type="text"
                        name="addressDetail"
                        className="MoreInfo_input"
                        value={formik.values.addressDetail}
                        onChange={formik.handleChange}
                        placeholder="나머지 주소를 입력해주세요"
                      />
                    </div>

                    {formik.touched.address && formik.errors.address && (
                      <div className="MoreInfo_error">
                        {formik.errors.address}
                      </div>
                    )}
                    {formik.touched.addressDetail &&
                      formik.errors.addressDetail && (
                        <div className="MoreInfo_error">
                          {formik.errors.addressDetail}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="MoreInfo_addressBtn">
                <button type="button" onClick={handleAddressSearch}>
                  주소 검색
                </button>
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
