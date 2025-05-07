import { useEffect, useState } from "react";
import { AddressStyled } from "./styled";

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressProps {
  onClose: () => void;
}

const Address = ({ onClose }: AddressProps) => {
  // 주소 상태 관리
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 카카오 주소 API 스크립트 load
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddress = data.address;
        setAddress(fullAddress);
      },
    }).open();
  };

  return (
    <AddressStyled>
      {/* 닫기 버튼 */}
      <button className="Address_close" onClick={onClose}>
        ×
      </button>

      <div className="Address_container">
        <div className="Address_wrap">
          <label>주소 등록</label>

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
            <button type="button">등록하기</button>
          </div>
        </div>
      </div>
    </AddressStyled>
  );
};

export default Address;
