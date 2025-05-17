import clsx from "clsx";
import { AdElementStyled } from "./styled";

//component

//AdElement component
const AdElement = (props: { el: any }) => {
  const { el } = props;
  return (
    <AdElementStyled className={clsx("AdElement_main_wrap")}>
      <div className="AdElement_img">
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
