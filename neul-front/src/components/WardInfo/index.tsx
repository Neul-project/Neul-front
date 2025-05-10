import { WardInfoStyled } from "./styled";
import ModalCompo from "../ModalCompo";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axiosInstance from "@/lib/axios";

type UserInfoType = {
  name: string;
  email: string;
  phone: string;
  address: string;
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

  // 보호자 + 피보호자 정보 요청
  useEffect(() => {
    const fetchWardInfo = async () => {
      try {
        const res = await axiosInstance.get("/patient/info");

        console.log("피보호자 정보: ", res.data);

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
      gender: "female",
      birth: "",
      note: "",
    },
    // validationSchema: changePwValidation,
    onSubmit: async (values) => {
      console.log("피보호자 정보 수정:", values);

      // try {
      //   const res = await axiosInstance.patch("/auth/password", {
      //     newPassword: values.password,
      //   });

      //   if (res.data?.ok) {
      //     alert("비밀번호가 성공적으로 변경되었습니다.");
      //     setwardOpen(false);
      //   } else {
      //     alert("비밀번호 변경에 실패했습니다.");
      //   }
      // } catch (error) {
      //   console.error("비밀번호 변경 오류:", error);
      //   alert("서버 오류가 발생했습니다.");
      // }
    },
  });

  return (
    <WardInfoStyled>
      {/* 보호자 정보 */}
      <div className="WardInfo_container m-b">
        <div>
          <div className="WardInfo_name">
            <span>홍길동</span>님
          </div>
          <div className="WardInfo_email">abcd@abcd.com</div>
        </div>
      </div>

      {/* 피보호자 정보 */}
      <div className="WardInfo_container">
        <div className="WardInfo_wardContainer">
          <div className="WardInfo_wardTitle">피보호자 정보</div>

          <div className="WardInfo_cont">
            <div className="WardInfo_wardName">
              피보호자명: <span>김영희 </span>
              <i className="fa-solid fa-venus woman" />
              <i className="fa-solid fa-mars man" />
            </div>
            <div className="WardInfo_email"></div>
          </div>

          <div className="WardInfo_birth">
            <div className="title">생년월일:</div>
            <div>1996-01-01 (만 28세)</div>
          </div>

          <div className="WardInfo_flex WardInfo_significant">
            <div className="WardInfo_cont2">특이사항:</div>
            <div className="WardInfo_sqare">
              특이사항으로는 무엇이있습니다. 특이사항으로는 무엇이있습니다.
              특이사항으로는 무엇이있습니다. 특이사항으로는 무엇이있습니다.
              특이사항으로는 무엇이있습니다.
            </div>
          </div>
        </div>
      </div>

      {/* 피보호자 정보 수정 모달 */}
      <ModalCompo onClose={() => setwardOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="WardInfo_EditForm">
          <div className="WardInfo_EditTitle">피보호자 정보 수정</div>

          <div className="WardInfo_EditInput">
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="WardInfo_EditInput">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
              />{" "}
              남성
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />{" "}
              여성
            </label>
          </div>

          <div className="WardInfo_EditInput">
            <input
              type="date"
              name="birth"
              value={formik.values.birth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="WardInfo_EditInput">
            <textarea
              name="note"
              placeholder="특이사항"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="MyInfo_CngPWSub">
            <button type="submit">수정</button>
          </div>
        </form>
      </ModalCompo>

      {/* 수정 버튼 */}
      <div className="WardInfo_editBtn">
        <button type="button">수정</button>
      </div>
    </WardInfoStyled>
  );
};

export default WardInfo;
