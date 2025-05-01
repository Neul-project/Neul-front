import clsx from "clsx";
import { AdvertisingStyled } from "./styled";

//component
import AdElement from "@/components/AdElement";

//images
import banner from "@/assets/images/banner.jpg";

//Advertising component
const Advertising = () => {
  const arr = [banner, banner];

  return (
    <AdvertisingStyled className="Advertising_main_wrap">
      {arr.map((element, index: number) => {
        return <AdElement key={index} el={element} />;
      })}
    </AdvertisingStyled>
  );
};

export default Advertising;
