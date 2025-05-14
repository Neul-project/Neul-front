import { useEffect, useMemo, useState } from "react";
import { LoadingStyled } from "./styled";

import Image from "next/image";

const Loading = () => {
  const gifList = ["/main01_deco.gif", "/main02_deco.gif", "/main03_deco.gif"];

  // 컴포넌트가 마운트될 때 단 한 번만 랜덤 선택
  const randomGif = useMemo(() => {
    const index = Math.floor(Math.random() * gifList.length);
    return gifList[index];
  }, []);

  const [dotCount, setDotCount] = useState(0);

  // '...' 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // 0, 1, 2, 3
    }, 500); // 0.5초 간격

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingStyled>
      <div className="Loading_center">
        <div className="Loading_wrap">
          <div>
            <Image
              src={randomGif}
              alt="gif"
              width={195}
              height={180}
              priority
            />
          </div>
          <p className="Loading_text">LOADING...</p>
        </div>
      </div>
    </LoadingStyled>
  );
};

export default Loading;
