import clsx from "clsx";
import { StatusStyled } from "./styled";
import StatusCheck from "@/components/StatusCheck";
import NoteBook from "@/components/NoteBook";
import Head from "next/head";

const Status = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap"
          rel="stylesheet"
        />
      </Head>
      <StatusStyled className={clsx("status_wrap")}>
        <div className="status_notebook">
          <NoteBook />
        </div>
      </StatusStyled>
    </>
  );
};

export default Status;
