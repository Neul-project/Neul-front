import clsx from "clsx";
import { GlobalStyle, StatusStyled } from "./styled";
import NoteBook from "@/components/NoteBook";
import StatusCheck from "@/components/StatusCheck";

const Status = () => {
  return (
    <>
      <GlobalStyle />
      <StatusStyled className={clsx("status_wrap")}>
        <div className="status_notebook">
          <NoteBook />
        </div>
        <div className="status_statuscheck">
          <StatusCheck />
        </div>
      </StatusStyled>
    </>
  );
};

export default Status;
