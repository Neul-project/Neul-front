import clsx from "clsx";
import { AdvertisingStyled } from "./styled";

//component
import AdElement from "@/components/AdElement";

//images
import banner from "@/assets/images/banner.jpg";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

//Advertising component
const Advertising = () => {
  const [arr, setArr] = useState([banner, banner]);

  //광고 이미지 요청
  useEffect(() => {
    // axiosInstance.get("/banner/list").then((res) => {
    //   const data = res.data;
    //   setArr(data);
    // });
  }, []);

  return (
    <AdvertisingStyled className="Advertising_main_wrap">
      {arr.map((element, index: number) => {
        return <AdElement key={index} el={element} />;
      })}
    </AdvertisingStyled>
  );
};

export default Advertising;
