import clsx from "clsx";
import { AdElementStyled } from "./styled";

//component

//AdElement component
const AdElement = (props: { el: any }) => {
  const { el } = props;
  return (
    <AdElementStyled className="AdElement_main_wrap">
      <div className="AdElement_img">
        <img className="AdElement_imgstyle" src={el.src} alt="img" />
      </div>
    </AdElementStyled>
  );
};

export default AdElement;
