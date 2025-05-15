import { SubImgStyled } from "./styled";

//프로그램 상세 하위 이미지
const SubImg = (props: { imgarr: string[]; setMainImg: any }) => {
  const { imgarr, setMainImg } = props;
  //console.log("imgarr", imgarr);
  return (
    <SubImgStyled className="SubImg_main_wrap">
      {imgarr.map((element, index: number) => {
        return (
          <div
            className="SubImg_img"
            key={index}
            onMouseEnter={() => setMainImg(element)}
          >
            <img
              className="SubImg_imgstyle"
              src={process.env.NEXT_PUBLIC_API_URL + "/uploads/" + element}
              alt={`img-${index}`}
            />
          </div>
        );
      })}
    </SubImgStyled>
  );
};

export default SubImg;
