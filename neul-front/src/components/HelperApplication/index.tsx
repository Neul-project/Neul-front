import { useEffect, useState } from "react";
import { HelperAppStyled } from "./styled";
import axiosInstance from "@/lib/axios";

import { formatAge } from "@/utils/formatter";

import clsx from "clsx";

import { loadTossPayments } from "@tosspayments/payment-sdk";

interface ApplyItem {
  id: number;
  dates: string;
  status: string;
}

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
  apply_status: string;
  apply_dates: string;
  apply_list: ApplyItem[];
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
  // 도우미 신청내역 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePageGroup, setVisiblePageGroup] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(helpers.length / pageSize);
  const visiblePages = 5; // 한 번에 보여줄 페이지 수 (1~5)

  const paginatedHelpers = helpers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 신청한 도우미 리스트 요청
  useEffect(() => {
    const fetchHelpers = async () => {
      try {
        const res = await axiosInstance.get("matching/myapplication-list");
        console.log("신청한 도우미 리스트 응답", res.data);

        // null값이 포함되어있다면 제거
        setHelpers(res.data.filter((item: any) => item !== null));
      } catch (error) {
        console.error("신청한 도우미 목록 불러오기 실패:", error);
      }
    };
    fetchHelpers();
  }, []);

  // 도우미 신청 - 토스 결제
  const tossClientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

  const handlePayment = async (
    amount: number,
    helperId: number,
    applyId: number
  ) => {
    console.log("도우미 신청결제: ", amount, helperId, applyId);

    if (!tossClientKey) {
      console.error("Toss client key가 없습니다.");
      return;
    }

    try {
      const orderId = `order-${Date.now()}`;
      const orderName = "도우미 신청 결제";

      // 서버에 결제내역 전송
      const res = await axiosInstance.post("/matching/create-payment", {
        amount,
        helperId: helperId,
        orderId,
        applyId,
      });

      // 2. 받은 orderId로 토스 결제창 띄우기
      const tossPayments = await loadTossPayments(tossClientKey);

      await tossPayments.requestPayment({
        amount,
        orderId,
        orderName,
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/confirm?&helperId=${helperId}`,
        failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
    }
  };

  return (
    <HelperAppStyled>
      <div className="HelperApp_container">
        <div className="HelperApp_title">
          <div>도우미 신청내역</div>
          <i
            className="fa-solid fa-circle-info info"
            onClick={() => setIsModalOpen((prev) => !prev)}
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setIsModalOpen(false)}
            title="반려 사유 보기"
          >
            {/* 안내 모달 */}
            {isModalOpen && (
              <div className="custom_modal_container">
                <div className="custom-modal">
                  <div className="modal-title">
                    <strong>※ 도우미 신청내역</strong>
                  </div>
                  <div>
                    <strong className="mainColor">'결제 대기'</strong> 상태일
                    경우 결제를 반드시 진행하셔야 도우미 신청이 완료됩니다.
                    <br />
                  </div>
                </div>
              </div>
            )}
          </i>
        </div>

        {/* 도우미 신청내역 */}
        <div className="ProgramHistory_item_container">
          {helpers.length === 0 ? (
            <div className="ProgramHistory_empty">
              <div className="empty_img">
                <img src="/empty.svg" alt="emptyImage" />
              </div>
              <div>도우미 신청내역이 없습니다.</div>
            </div>
          ) : (
            paginatedHelpers.map((helper) => {
              const apply = helper.apply_list?.[0]; // 첫 번째 신청 내역
              const applyDates = apply?.dates || "";
              const dateArray = applyDates.split(",").filter(Boolean);
              const dateCount = dateArray.length;
              const status = apply?.status || "신청 정보 없음";
              const totalAmount = helper.desiredPay * dateCount;

              return (
                <div className="HelperApp_Content" key={helper?.id}>
                  <div className="HelperApp_flexbox">
                    <div>
                      {helper?.user.name}{" "}
                      <span className="helper">도우미 </span>
                      {helper?.gender === "male" ? (
                        <i className="fa-solid fa-mars man" />
                      ) : (
                        <i className="fa-solid fa-venus woman" />
                      )}{" "}
                      <span className="helper">
                        ({formatAge(helper?.birth)})
                      </span>
                    </div>
                  </div>

                  {/* 도우미 기본 정보 */}
                  <div className="HelperApp_container2">
                    <p>경력: {helper?.experience}</p>
                    <p>희망 일당: {helper?.desiredPay.toLocaleString()}원</p>
                  </div>

                  {/* 여러 개의 신청내역을 반복 출력 */}
                  {helper.apply_list?.map((apply, idx) => {
                    const dates = apply.dates?.split(",").filter(Boolean);
                    const dateCount = dates.length;
                    const totalAmount = helper.desiredPay * dateCount;

                    return (
                      <div
                        key={idx}
                        className="HelperApp_AppContainer HelperApp_container2"
                      >
                        <p>
                          ※ <strong>신청 내역{idx + 1}</strong>
                        </p>
                        <div className="flex_01">
                          <p>상태: {apply.status}</p>
                          <div className="btn_box">
                            {apply.status === "결제 대기" && (
                              <button
                                className="HelperApp_btn"
                                onClick={() =>
                                  handlePayment(
                                    totalAmount,
                                    helper.user.id,
                                    apply.id
                                  )
                                }
                              >
                                결제
                              </button>
                            )}
                          </div>
                        </div>

                        <p>신청 날짜: {dates.join(", ")}</p>
                        <p>신청 일수: {dateCount}일</p>
                        <p className="stress">
                          <span>결제예정 금액: </span>
                          <strong>{totalAmount.toLocaleString()}</strong>원
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* 페이지네이션 */}
        {helpers.length !== 0 && (
          <div className="pagination">
            <button
              className="number_btn start"
              onClick={() => {
                if (visiblePageGroup > 1) {
                  setVisiblePageGroup(visiblePageGroup - 1);
                  setCurrentPage((visiblePageGroup - 2) * visiblePages + 1);
                }
              }}
              disabled={visiblePageGroup === 1}
            >
              <img src="/left_icon.png" alt="left_icon" />
            </button>

            {Array.from({ length: visiblePages }, (_, idx) => {
              const page = (visiblePageGroup - 1) * visiblePages + (idx + 1);
              if (page > totalPages) return null;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={clsx("number_btn", {
                    active: currentPage === page,
                  })}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="number_btn"
              onClick={() => {
                if (visiblePageGroup * visiblePages < totalPages) {
                  setVisiblePageGroup(visiblePageGroup + 1);
                  setCurrentPage(visiblePageGroup * visiblePages + 1);
                }
              }}
              disabled={visiblePageGroup * visiblePages >= totalPages}
            >
              <img src="/right_icon.png" alt="right_icon" />
            </button>
          </div>
        )}
      </div>
    </HelperAppStyled>
  );
};

export default HelperApplication;
