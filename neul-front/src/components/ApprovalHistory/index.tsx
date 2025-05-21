import { useEffect, useState } from "react";
import { ApprovalHistoryStyled } from "./styled";
import axiosInstance from "@/lib/axios";

import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

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
  status: string;
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

// 가입승인 내역(도우미)
const ApprovalHistory = () => {
  // 도우미 리스트
  const [helpers, setHelpers] = useState<HelperInfo[]>([]);

  console.log("도우미 가입내역 승인여부", helpers);

  // 도우미 리스트 요청
  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const res = await axiosInstance.get("helper/approveduser");
        setHelpers(res.data);
      } catch (error) {
        console.error("도우미 목록 불러오기 실패:", error);
      }
    };

    fetchHelpers();
  }, []);

  // const onEdit = (id: number) => {
  //   alert(`도우미 ID ${id} 수정 화면으로 이동합니다.`);
  //   // 혹은 모달 열기, 페이지 이동 등 원하는 액션
  // };

  // // 테이블 컬럼 구성
  // const columns: ColumnsType<HelperInfo> = [
  //   {
  //     title: "이름",
  //     dataIndex: ["user", "name"],
  //     key: "name",
  //   },
  //   {
  //     title: "상태",
  //     dataIndex: "status",
  //     key: "status",
  //   },

  //   {
  //     title: "가입일",
  //     dataIndex: ["user", "created_at"],
  //     key: "created_at",
  //     render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
  //   },
  //   {
  //     title: "정보수정",
  //     key: "action",
  //     render: (_, record) =>
  //       record.status === "승인 반려" ? (
  //         <Button onClick={() => onEdit(record.id)}>수정</Button>
  //       ) : null,
  //   },
  // ];

  return (
    <ApprovalHistoryStyled>
      <div className="ApprovalHistory_container">
        <div className="ApprovalHistory_title">가입승인 내역(도우미)</div>

        <div className="ApprovalHistory_infoBox">ㅇㅇ</div>
      </div>
    </ApprovalHistoryStyled>
  );
};

export default ApprovalHistory;
