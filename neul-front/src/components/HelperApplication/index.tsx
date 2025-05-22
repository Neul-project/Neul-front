import { useEffect, useState } from "react";
import { HelperAppStyled } from "./styled";
import axiosInstance from "@/lib/axios";

interface HelperInfo {
  id: number;
  gender: string;
  birth: string;
  profileImage: string;
  certificate: string; // 자격증 pdf파일
  desiredPay: number; // 희망 일당
  experience: string; // 경력사항
  certificateName: string;
  certificateName2: string | null;
  certificateName3: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    created_at: string;
    password: string;
    provider: "local" | string;
    role: "admin" | "user" | string;
  };
}

// 도우미 신청내역(사용자)
const HelperApplication = () => {
  // 신청한 도우미 리스트
  const [helpers, setHelpers] = useState<HelperInfo[]>([]);

  // 신청한 도우미 리스트 요청
  // useEffect(() => {
  //   const fetchHelpers = async () => {
  //     try {
  //       const res = await axiosInstance.get("matching/myapplication-list");
  //       console.log("신청한 도우미 리스트 응답", res.data);

  //       setHelpers(res.data);
  //     } catch (error) {
  //       console.error("신청한 도우미 목록 불러오기 실패:", error);
  //     }
  //   };

  //   fetchHelpers();
  // }, []);

  return (
    <HelperAppStyled>
      <div className="HelperApp_container">
        <div className="HelperApp_title">도우미 신청내역</div>

        <div className="HelperApp_btn">
          <button>결제</button>
        </div>
      </div>
    </HelperAppStyled>
  );
};

export default HelperApplication;
