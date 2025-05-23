import { useEffect, useState } from "react";
import { ApprovalHistoryStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import dayjs from "dayjs";
import { formatPhoneNumber } from "@/utils/formatter";
import { useFormik } from "formik";
import { editHelperValidationSchema } from "@/utils/joinValidation";
import { useAuthStore } from "@/stores/useAuthStore";

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
  reason: string | null;
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
  // zustand 로그인 유저 정보, admin 정보 가져오기
  const userId = useAuthStore((state) => state.user?.id);
  console.log(userId);

  // 도우미 내역
  const [helper, setHelper] = useState<HelperInfo | null>(null);
  // 승인 반려 hover 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 수정 버튼 클릭 시
  const [showEditForm, setShowEditForm] = useState(false);

  // console.log("도우미 가입내역 승인여부", helper);

  // 도우미 정보 요청
  useEffect(() => {
    if (!userId) return;

    console.log("ddddd", userId);
    const fetchHelpers = async () => {
      try {
        const res = await axiosInstance.get("helper/userlist", {
          params: { id: userId },
        });

        setHelper(res.data);
      } catch (error) {
        console.error("도우미 불러오기 실패:", error);
      }
    };

    fetchHelpers();
  }, [userId]);

  // 도우미 정보 보완 후 재승인 요청
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      desiredPay: helper?.desiredPay ?? "",
      experience: helper?.experience ?? "",
      certificateName_01: helper?.certificateName ?? "",
      certificateName_02: helper?.certificateName2 ?? "",
      certificateName_03: helper?.certificateName3 ?? "",
      certificate: undefined,
      profileImage: undefined,
    },
    validationSchema: editHelperValidationSchema,
    onSubmit: async (values) => {
      const confirm = window.confirm(
        "입력하신 내용을 다시 한 번 확인해주세요.\n재승인 요청을 하시겠습니까?"
      );
      if (!confirm) return;

      try {
        const formData = new FormData();

        Object.entries(values).forEach(([key, val]) => {
          if (typeof val === "object" && val instanceof File) {
            formData.append(key, val);
          } else if (val !== undefined && val !== null && val !== "") {
            formData.append(key, String(val));
          }
        });

        // 사용자 id같이 전송
        if (helper?.user?.id) {
          formData.append("userId", String(helper.user.id));
        }

        // 파일을 새로 업로드하지 않은 경우 기존 파일명 유지
        if (!values.profileImage && helper?.profileImage) {
          formData.append("existingProfileImage", helper.profileImage);
        }
        if (!values.certificate && helper?.certificate) {
          formData.append("existingCertificate", helper.certificate);
        }

        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        // 재승인 요청 전송
        const res = await axiosInstance.patch("/helper/edit-profile", formData);

        console.log("resdata", res.data);

        if (res.data?.ok) {
          alert("재승인 요청이 완료되었습니다.");

          // '승인 대기'로 프론트에서 임시 변경
          setHelper((prev) => (prev ? { ...prev, status: "승인 대기" } : prev));

          setShowEditForm(false);
        } else {
          alert("재승인 요청이 실패했습니다.");
        }
      } catch (error) {
        console.error("재승인 요청 실패:", error);
        alert("서버 오류가 발생했습니다.");
      }
    },
  });

  // 날짜 포맷
  const formatted = dayjs(helper?.user?.created_at).format("YYYY-MM-DD HH:mm");

  return (
    <ApprovalHistoryStyled>
      <div className="ApprovalHistory_container">
        <div className="ApprovalHistory_title">도우미 가입승인 내역</div>

        <div className="ApprovalHistory_infoBox">
          <div className="wrap">
            <div className="Approval_box">
              <div className="box1">이름</div>
              <div className="content1">{helper?.user?.name}</div>
            </div>

            <div className="Approval_box">
              <div className="box1">상태</div>
              <div className="content1">
                {helper?.status}{" "}
                {helper?.status === "승인 반려" && (
                  <i
                    className="fa-solid fa-circle-info info"
                    onClick={() => setIsModalOpen((prev) => !prev)}
                    onMouseEnter={() => setIsModalOpen(true)}
                    onMouseLeave={() => setIsModalOpen(false)}
                    title="반려 사유 보기"
                  />
                )}
                {/* 승인 반려 시 안내 모달 */}
                {isModalOpen && (
                  <div className="custom_modal_container">
                    <div className="custom-modal">
                      <div className="modal-title">
                        <strong>※ 승인 반려 안내</strong>
                      </div>
                      <div>
                        관리자에 의해 승인 요청이 반려되었습니다.
                        <br />
                        <strong>[작성한 정보 보기]</strong> 버튼을 눌러 반려
                        사유를 확인하시고 정보를 보완하여 다시 승인
                        요청해주세요.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="wrap">
            <div className="Approval_box">
              <div className="box1">가입일</div>
              <div className="content1">{formatted}</div>
            </div>

            <div className="Approval_box">
              <div className="box1">정보수정</div>
              <div className="content1">
                {helper?.status === "승인 반려" ? (
                  <button
                    className="Approval_edit"
                    onClick={() => setShowEditForm((prev) => !prev)}
                  >
                    {showEditForm ? "정보 숨기기" : "작성한 정보 보기"}
                  </button>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 수정사항 form */}
        {showEditForm && (
          <form className="Approval_edit_form" onSubmit={formik.handleSubmit}>
            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">이메일</div>
                <div className="content1">{helper?.user?.email}</div>
              </div>

              <div className="Approval_box">
                <div className="box1">생년월일</div>
                <div className="content1">{helper?.birth}</div>
              </div>
            </div>

            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">성별</div>
                <div className="content1">
                  {helper?.gender === "male" ? "남성" : "여성"}
                </div>
              </div>

              <div className="Approval_box">
                <div className="box1">휴대폰</div>
                <div className="content1">
                  {formatPhoneNumber(helper?.user?.phone!)}
                </div>
              </div>
            </div>

            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">희망 일당</div>
                <div className="content1">
                  <input
                    className="input1"
                    type="number"
                    name="desiredPay"
                    value={formik.values.desiredPay}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.desiredPay && (
                    <div className="error">{formik.errors.desiredPay}</div>
                  )}
                </div>
              </div>

              <div className="Approval_box">
                <div className="box1">경력 사항</div>
                <div className="content1">
                  <textarea
                    className="input1 area"
                    name="experience"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.experience && (
                    <div className="error">{formik.errors.experience}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">프로필 사진</div>
                <div className="content1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/image/${helper?.profileImage}`}
                    alt="프로필"
                    width={70}
                    height={70}
                    style={{ borderRadius: "4px", objectFit: "cover" }}
                  />
                  <input
                    className="input1 font"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "profileImage",
                        e.currentTarget.files?.[0]
                      )
                    }
                  />
                  {formik.errors.profileImage && (
                    <div className="error">{formik.errors.profileImage}</div>
                  )}
                </div>
              </div>

              <div className="Approval_box">
                <div className="box1">자격증 파일</div>
                <div className="content1">
                  <a
                    className="view_file"
                    href={`${process.env.NEXT_PUBLIC_API_URL}/uploads/file/${helper?.certificate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    기존 파일 보기
                  </a>
                  <input
                    className="input1 font"
                    type="file"
                    name="certificate"
                    accept=".pdf,image/*"
                    onChange={(e) =>
                      formik.setFieldValue(
                        "certificate",
                        e.currentTarget.files?.[0]
                      )
                    }
                  />
                  {formik.errors.certificate && (
                    <div className="error">{formik.errors.certificate}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">자격증 명</div>
                <div className="content1">
                  <input
                    className="input1"
                    type="text"
                    name="certificateName_01"
                    value={formik.values.certificateName_01}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.certificateName_01 && (
                    <div className="error">
                      {formik.errors.certificateName_01}
                    </div>
                  )}
                </div>
              </div>

              <div className="Approval_box">
                <div className="box1">자격증 명2</div>
                <div className="content1">
                  <input
                    className="input1"
                    type="text"
                    name="certificateName_02"
                    value={formik.values.certificateName_02}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="wrap">
              <div className="Approval_box">
                <div className="box1">자격증 명3</div>
                <div className="content1">
                  <input
                    className="input1"
                    type="text"
                    name="certificateName_03"
                    value={formik.values.certificateName_03}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className="Approval_box">
                <div className="box1">
                  <strong>반려사유</strong>
                </div>
                <div className="content1">{helper?.reason}</div>
              </div>
            </div>

            <div className="edit_helper_info">
              <button type="submit">재승인 요청</button>
            </div>
          </form>
        )}
      </div>
    </ApprovalHistoryStyled>
  );
};

export default ApprovalHistory;
