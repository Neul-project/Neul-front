import { useEffect, useState } from "react";
import { PaymentStyled } from "./styled";
import axiosInstance from "@/lib/axios";

interface UserInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface Program {
  name: string;
  manager: string;
  price: string;
  img: string;
}

const PaymentFeature = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  // const [programs, setPrograms] = useState<Program[]>([]);

  // 프로그램 신청 정보 요청
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get("/program/payment");
  //       console.log("결제 프로그램 내역 응답", res.data);
  //       setPrograms(res.data);
  //     } catch (err) {
  //       console.error("결제 프로그램 오류:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // 내 정보 요청
  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await axiosInstance.get("/user/info");

        const { name, email, phone, address } = res.data;
        setUserInfo({ name, email, phone, address });
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      }
    };

    fetchMyInfo();
  }, []);

  // 신청한 프로그램 데이터(임시)
  const programs = [
    {
      name: "발달장애 아동을 위한 감각통합 놀이",
      manager: "강사명 1",
      price: "18,000원",
      img: "/cute_dog.jpg",
    },
    {
      name: "미술 치료 프로그램",
      manager: "강사명 2",
      price: "20,000원",
      img: "/cute_dog.jpg",
    },
    {
      name: "음악 치료 프로그램",
      manager: "강사명 3",
      price: "25,000원",
      img: "/cute_dog.jpg",
    },
    {
      name: "사회성 훈련 프로그램",
      manager: "강사명 4",
      price: "15,000원",
      img: "/cute_dog.jpg",
    },
    {
      name: "언어 치료 프로그램",
      manager: "강사명 5",
      price: "22,000원",
      img: "/cute_dog.jpg",
    },
  ];

  return (
    <PaymentStyled>
      <div className="Payment_title">결제하기</div>

      <div className="Payment_container">
        {/* 왼쪽 */}
        <div className="Payment_leftContainer">
          {/* 주문자 정보 */}
          <div className="Orderer_info radius">
            <div className="title">주문자 정보</div>

            <div className="Orderder_info_container">
              <div className="O_orderer">{userInfo?.name}</div>
              <div className="O_phone">{userInfo?.phone}</div>
              <div className="O_email">{userInfo?.email}</div>
            </div>
          </div>

          {/* 프로그램 주문 정보 */}
          <div className="Program_info radius">
            <div className="title">프로그램 주문 정보</div>

            {/* 프로그램 주문 목록 */}
            {programs.map((program, i) => (
              <div key={i} className="program_info_container">
                <div className="program_info_imgDiv">
                  <img src={program.img} alt={program.name} />
                </div>

                <div>
                  <div className="p_name">{program.name}</div>
                  <div className="p_manager">{program.manager}</div>
                  <div className="p_price">{program.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="Payment_RightContainer">
          <div className="Payment_RightSubContainer">
            {/* 총 결제금액 */}
            <div className="Total_amount radius">
              <div className="title">결제금액</div>

              <div className="T_flex">
                <div className="T_column">상품금액</div>
                <div className="T_price">10,000원</div>
              </div>
              <div className="T_flex">
                <div className="T_column">상품할인금액</div>
                <div className="T_price">-1,000원</div>
              </div>

              <div className="hr" />

              <div className="T_amount T_flex">
                <div>총 결제금액</div>
                <div className="T_result">9,000원</div>
              </div>
            </div>

            <div className="T_btn">
              <button>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </PaymentStyled>
  );
};

export default PaymentFeature;
