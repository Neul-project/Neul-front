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
    axiosInstance.get("/banner/list").then((res) => {
      //console.log("banner Res", res.data);
      const datalist = res.data;
      const data = res.data[datalist.length - 1].img.split(",");
      setArr(data);
    });
  }, []);

  return (
    <AdvertisingStyled className={clsx("Advertising_main_wrap")}>
      {arr.map((element, index: number) => {
        return <AdElement key={index} el={element} />;
      })}
    </AdvertisingStyled>
  );
};

export default Advertising;
