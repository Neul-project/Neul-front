import { WardInfoStyled } from "./styled";

import { useEffect, useState } from "react";
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
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);

  // 보호자 + 피보호자 정보 요청
  useEffect(() => {
    const fetchWardInfo = async () => {
      try {
        const res = await axiosInstance.get("/user/info");

        console.log("피보호자 정보: ", res.data);

        setUserInfo(res.data);
      } catch (error) {
        console.error("피보호자 정보 불러오기 실패:", error);
      }
    };

    fetchWardInfo();
  }, []);

  // {
  //   "name": "홍길동",
  //   "email": "abcd@abcd.com",
  //   "phone": "010-1111-1111",
  //   "address": "서울시 강남구",
  //   "ward": {
  //     "name": "김영희",
  //     "gender": "female",
  //     "birth": "1996-01-01",
  //     "note": "특이사항으로는 무엇이 있습니다."
  //   }
  // }

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

      {/* 수정 버튼 */}
      <div className="WardInfo_editBtn">
        <button type="button">수정</button>
      </div>
    </WardInfoStyled>
  );
};

export default WardInfo;
