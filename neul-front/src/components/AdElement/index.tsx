import clsx from "clsx";
import { AdElementStyled } from "./styled";
import { useRouter } from "next/router";

//component

//AdElement component
const AdElement = (props: { el: any; url: any }) => {
  const { el, url } = props;
  const router = useRouter();

  const urlCick = () => {
    //console.log("url", url);
    window.open(url, "_blank");
  };

  return (
    <AdElementStyled className={clsx("AdElement_main_wrap")}>
      <div className="AdElement_img" onClick={urlCick}>
        <img
          className="AdElement_imgstyle"
          src={process.env.NEXT_PUBLIC_API_URL + "/uploads/image/" + el}
          alt="img"
        />
      </div>
    </AdElementStyled>
  );
};

export default AdElement;
