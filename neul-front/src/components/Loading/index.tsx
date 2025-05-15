import { useEffect, useMemo, useState } from "react";
import { LoadingStyled } from "./styled";

import Image from "next/image";

const gifList = [
  "/main01_deco_resize.gif",
  "/main02_deco_resize.gif",
  "/main03_deco_resize.gif",
];

const Loading = () => {
  console.log("실행됨", typeof window === "undefined" ? "서버" : "클라이언트");

  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * gifList.length);
    setSelectedGif(gifList[index]);
  }, []);

  return (
    <LoadingStyled>
      <div className="Loading_center">
        <div className="Loading_wrap">
          <div>
            {selectedGif && (
              <Image
                src={selectedGif}
                alt="gif"
                width={240}
                height={140}
                priority
              />
            )}
          </div>
          <p className="Loading_text">LOADING...</p>
        </div>
      </div>
    </LoadingStyled>
  );
};

export default Loading;
