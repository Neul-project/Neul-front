import clsx from "clsx";
import { AdvertisingStyled } from "./styled";

//component
import AdElement from "@/components/AdElement";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

//Advertising component
const Advertising = () => {
  const [arr, setArr] = useState([]);
  const [url, setUrl] = useState([]);

  //광고 이미지 요청
  useEffect(() => {
    axiosInstance
      .get("/banner/list")
      .then((res) => {
        //console.log("banner Res", res.data);
        const datalist = res.data;
        //console.log("res", datalist);
        if (datalist.length > 0) {
          const data = res.data[datalist.length - 1].img.split(",");
          const urldata = res.data[datalist.length - 1].url.split(",");
          //console.log("data", urldata);
          setArr(data);
          setUrl(urldata);
        }
      })
      .catch((error: string) => {
        console.log("광고 error");
      });
  }, []);

  return (
    <AdvertisingStyled className={clsx("Advertising_main_wrap")}>
      <h5 className="Advertising_title_text">다른 기업 이야기</h5>

      <div className="Advertising_adimg">
        {arr.length > 0 ? (
          arr.map((element, index: number) => {
            return <AdElement key={index} el={element} url={url[index]} />;
          })
        ) : (
          <div className="Advertising_empty">
            <div className="empty_img">
              <img src="/empty.svg" alt="emptyImage" />
            </div>
            <div className="Advertising_text">광고 준비 중 입니다</div>
          </div>
        )}
      </div>
    </AdvertisingStyled>
  );
};

export default Advertising;
