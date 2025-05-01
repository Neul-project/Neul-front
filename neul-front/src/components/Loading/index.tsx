import { LoadingStyled } from "./styled";

const Loading = () => {
  return (
    <LoadingStyled>
      <div className="Loading_center">
        <div className="Loading_wrap">
          <div className="Loading_loader"></div>
          <p className="Loading_text">LOADING...</p>
        </div>
      </div>
    </LoadingStyled>
  );
};

export default Loading;
