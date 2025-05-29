import { useEffect, useState } from "react";
import { AddressStyled } from "./styled";

import axiosInstance from "@/lib/axios";
import { message, notification } from "antd";

import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressProps {
  onClose: () => void;
  onAddressSaved: () => void;
  addressProps: string;
}

// 주소등록 모달
const Address = ({ onClose, onAddressSaved, addressProps }: AddressProps) => {
  // 상위 컴포넌트에 주소가 등록되어있는지 체크
  const isEditing = Boolean(addressProps?.trim());

  // 모달 DOM 참조용
  const modalRef = useRef<HTMLDivElement>(null);
  // 외부 클릭 시 닫기
  useOutsideClick(modalRef, onClose);

  // 주소 상태 관리
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        setAddress(fullAddress);
      },
    }).open();
  };

  // 주소등록 요청
  const handleAddressSubmit = async () => {
    if (!address) {
      message.info("주소를 입력해주세요.");
      return;
    }

    if (!addressDetail.trim()) {
      message.info("상세 주소를 입력해주세요.");
      return;
    }

    const fullAddress = `${address} ${addressDetail}`.trim();

    // console.log("fullAddress:", fullAddress);

    try {
      const res = await axiosInstance.post("/user/address", {
        address: fullAddress,
      });

      if (res.data?.ok) {
        notification.success({
          message: "주소 등록 성공",
          description: "주소가 성공적으로 등록되었습니다.",
        });
        onAddressSaved(); // 주소 등록 시 정보 갱신
        onClose();
      } else {
        notification.error({
          message: "주소 등록 실패",
          description: "주소 등록에 실패했습니다.",
        });
      }
    } catch (error) {
      console.error("주소 등록 오류:", error);
      notification.error({
        message: "주소 등록 실패",
        description: "서버 오류가 발생했습니다.",
      });
    }
  };

  return (
    <AddressStyled>
      {/* 닫기 버튼 */}
      <div className="Address_close" onClick={onClose}>
        <i className="fa-solid fa-xmark "></i>
      </div>

      <div className="Address_container" ref={modalRef}>
        <div className="Address_wrap">
          <label>{isEditing ? "주소 수정" : "주소 등록"}</label>

          <div className="Address_inputWrap">
            {/* 주소 */}
            <div className="Address_flex">
              <div className="Address_width">
                <input
                  type="text"
                  name="address"
                  className="Address_input"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="주소를 입력해 주세요"
                  readOnly
                />
              </div>

              <div className="Address_search">
                <button type="button" onClick={handleAddressSearch}>
                  주소 검색
                </button>
              </div>
            </div>

            {/* 상세 주소 */}
            <div>
              <input
                type="text"
                name="addressDetail"
                className="Address_input"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="나머지 주소를 입력해주세요"
              />
            </div>
          </div>

          <div className="Address_submit margin">
            <button type="button" onClick={handleAddressSubmit}>
              {isEditing ? "수정하기" : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </AddressStyled>
  );
};

export default Address;
