import { ProgramHistoryStyled, Cell, Btn } from "./styled";
import clsx from "clsx";
import ModalCompo from "../ModalCompo";
import * as S from "@/components/ModalCompo/ModalContent";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { refundValidation } from "@/utils/userValidation";
import { isRefundAvailable } from "@/utils/getEndDate";

import axiosInstance from "@/lib/axios";
import { message, notification } from "antd";

import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface Program {
  id: number;
  img: string;
  name: string;
  manager: string;
  price: number;
  payment_status: string;
  refund_status: string;
  cart_at: string;
  recruitment: string;
}

// 프로그램 신청내역 컴포넌트
const ProgramHistory = () => {
  // 프로그램 목록
  const [programs, setPrograms] = useState<Program[]>([]);
  // 환불 모달 on/off
  const [refundOpen, setRefundOpen] = useState(false);
  // 환불 프로그램 id
  const [selectedProgramId, setSelectedProgramId] = useState<number | null>(
    null
  );
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 DOM 참조용
  const modalRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 닫기
  useOutsideClick(modalRef, () => setRefundOpen(false));

  console.log("프로그램 신청목록: ", programs);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePageGroup, setVisiblePageGroup] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(programs.length / pageSize);
  const visiblePages = 5; // 한 번에 보여줄 페이지 수 (1~5)

  const paginatedPrograms = programs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // console.log("currentPage:", currentPage);
  // console.log("paginatedPrograms:", paginatedPrograms);

  // 프로그램 신청내역 요청
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axiosInstance.get("/program/histories");
        setPrograms(res.data); // [{}, {}, {}] 40줄 참조
      } catch (err) {
        console.error("프로그램 신청내역 불러오기 오류:", err);
      }
    };

    fetchPrograms();
  }, []);

  // 환불 요청
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      accountHolder: "",
      bankName: "",
      refundReason: "",
    },
    validationSchema: refundValidation,
    onSubmit: async (values, { resetForm }) => {
      if (!selectedProgramId) {
        message.info("프로그램을 선택해주세요.");
        return;
      }

      const payload = {
        programs_id: selectedProgramId,
        account: values.accountNumber,
        name: values.accountHolder,
        bank: values.bankName,
        note: values.refundReason,
      };

      // console.log("환불신청 데이터: ", payload);

      try {
        const res = await axiosInstance.post("/program/refund", payload);

        if (res.data?.ok) {
          notification.success({
            message: "환불 신청 성공",
            description: "환불 신청이 완료되었습니다.",
          });

          // 상태 업데이트
          setPrograms((prevPrograms) =>
            prevPrograms.map((program) =>
              program.id === selectedProgramId
                ? { ...program, refund_status: "환불 대기" }
                : program
            )
          );

          resetForm();
          setSelectedProgramId(null);
          setRefundOpen(false);
        } else {
          notification.error({
            message: "환불 신청 실패",
            description: "환불 신청에 실패했습니다. 다시 시도해주세요.",
          });
          console.warn("환불 실패 응답:", res.data);
        }
      } catch (err) {
        console.error(err);
        notification.error({
          message: "환불 신청 실패",
          description: "환불 신청 중 오류가 발생했습니다.",
        });
      }
    },
  });

  return (
    <ProgramHistoryStyled>
      <div className="ProgramHistory_container">
        <div className="ProgramHistory_title">
          <div>프로그램 신청내역</div>
          <i
            className="fa-solid fa-circle-info info"
            onClick={() => setIsModalOpen((prev) => !prev)}
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setIsModalOpen(false)}
          >
            {/* 안내 모달 */}
            {isModalOpen && (
              <div className="custom_modal_container">
                <div className="custom-modal">
                  <div className="modal-title">
                    <strong>※ 프로그램 환불안내</strong>
                  </div>
                  <div>
                    <strong className="mainColor">'결제 완료'</strong> 후
                    프로그램 환불은 프로그램 시작 1일전 까지만 가능합니다.
                    <br />
                  </div>
                </div>
              </div>
            )}
          </i>
        </div>

        {/* 프로그램 목록 */}
        <div className="ProgramHistory_item_container">
          {programs.length === 0 ? (
            <div className="ProgramHistory_empty">
              <div className="empty_img">
                <img src="/empty.svg" alt="emptyImage" />
              </div>
              <div>신청한 프로그램이 없습니다.</div>
            </div>
          ) : (
            paginatedPrograms.map((data) => (
              <div className="ProgramHistory_item_box" key={data.id}>
                <div className="ProgramHistory_semicircle"></div>

                <div className="ProgramHistory_content_wrap">
                  <div className="ProgramHistory_content">
                    <div className="p_name">
                      <a href={`/program/${data.id}`}>{data.name}</a>
                    </div>
                    <div className="payment">
                      {data.refund_status
                        ? data.refund_status
                        : data.payment_status}
                    </div>
                  </div>

                  <div>
                    <div className="manager">{data.manager}</div>
                  </div>

                  <div className="ProgramHistory_content">
                    <div className="price">{data.price.toLocaleString()}원</div>
                  </div>

                  <div className="ProgramHistory_content flex-end">
                    {data.payment_status !== "결제 대기" &&
                      !["환불 대기", "환불 완료"].includes(
                        data.refund_status
                      ) &&
                      isRefundAvailable(data.recruitment) && (
                        <Btn
                          onClick={() => {
                            setSelectedProgramId(data.id);
                            setRefundOpen(true);
                          }}
                        >
                          환불
                        </Btn>
                      )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {programs.length !== 0 && (
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

      {/* 환불 모달 */}
      {refundOpen && (
        <ModalCompo onClose={() => setRefundOpen(false)}>
          <div ref={modalRef}>
            <S.ModalFormWrap onSubmit={formik.handleSubmit}>
              <S.ModalTitle>환불정보 작성</S.ModalTitle>

              {/* 환불 계좌번호 */}
              <S.ModalInputDiv>
                <S.ModalCont>
                  환불 계좌번호<span>*</span>
                </S.ModalCont>
                <S.ModalInput
                  type="text"
                  name="accountNumber"
                  placeholder="환불 계좌번호를 입력해주세요"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.accountNumber &&
                  formik.errors.accountNumber && (
                    <div className="error">{formik.errors.accountNumber}</div>
                  )}
              </S.ModalInputDiv>

              <div className="flex">
                {/* 예금자명 */}
                <S.ModalInputDiv>
                  <S.ModalCont>
                    예금자명<span>*</span>
                  </S.ModalCont>
                  <S.ModalInput
                    type="text"
                    name="accountHolder"
                    placeholder="예금자명을 입력해주세요"
                    value={formik.values.accountHolder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.accountHolder &&
                    formik.errors.accountHolder && (
                      <div className="error">{formik.errors.accountHolder}</div>
                    )}
                </S.ModalInputDiv>

                {/* 은행명 */}
                <S.ModalInputDiv>
                  <S.ModalCont>
                    은행명<span>*</span>
                  </S.ModalCont>
                  <S.ModalSelect
                    name="bankName"
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">은행을 선택해주세요</option>
                    <option value="국민은행">국민은행</option>
                    <option value="신한은행">신한은행</option>
                    <option value="우리은행">우리은행</option>
                    <option value="하나은행">하나은행</option>
                    <option value="농협은행">농협은행</option>
                  </S.ModalSelect>
                  {formik.touched.bankName && formik.errors.bankName && (
                    <div className="error">{formik.errors.bankName}</div>
                  )}
                </S.ModalInputDiv>
              </div>

              {/* 환불사유 */}
              <S.ModalInputDiv>
                <S.ModalCont>
                  환불 사유<span>*</span>
                </S.ModalCont>
                <S.ModalTextarea
                  name="refundReason"
                  placeholder="환불 사유를 입력해주세요"
                  value={formik.values.refundReason}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.refundReason && formik.errors.refundReason && (
                  <div className="error">{formik.errors.refundReason}</div>
                )}
              </S.ModalInputDiv>

              <div className="MyInfo_CngPWSub">
                <S.ModalButton type="submit">환불신청</S.ModalButton>
              </div>
            </S.ModalFormWrap>
          </div>
        </ModalCompo>
      )}
    </ProgramHistoryStyled>
  );
};

export default ProgramHistory;
