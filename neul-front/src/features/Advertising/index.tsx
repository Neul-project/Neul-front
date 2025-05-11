import clsx from "clsx";
import { AdvertisingStyled } from "./styled";

//component
import AdElement from "@/components/AdElement";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

//Advertising component
const Advertising = () => {
  const [arr, setArr] = useState([]);

  //광고 이미지 요청
  useEffect(() => {
    if (arr) {
      axiosInstance.get("/banner/list").then((res) => {
        //console.log("banner Res", res.data);
        const datalist = res.data;
        const data = res.data[datalist.length - 1].img.split(",");
        setArr(data);
      });
    }
  }, []);

  return (
    <AdvertisingStyled className={clsx("Advertising_main_wrap")}>
      <ul className="Advertising_title_circle">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <h5 className="Advertising_title_text">다른 기업 이야기</h5>

      <div className="Advertising_adimg">
        {arr ? (
          arr.map((element, index: number) => {
            return <AdElement key={index} el={element} />;
          })
        ) : (
          <div className="Advertising_text">광고 준비 중 입니다</div>
        )}
      </div>
    </AdvertisingStyled>
  );
};

export default Advertising;
