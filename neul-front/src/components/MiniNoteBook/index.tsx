import clsx from "clsx";
import { MiniNoteBookStyled } from "./styled";

// 작은 수첩의 고리 부분
const MiniNoteBook = () => {
  const num = Array(5).fill(0);

  return (
    <MiniNoteBookStyled className={clsx("mininotebook_wrap")}>
      <div className="mininotebook_box">
        {/* 고리 */}
        <div className="mininotebook_spring">
          {num.map((_, i) => (
            <div
              key={i}
              className={`mininotebook_ring mininotebook_ring${i + 1}`}
            >
              <div className="mininotebook_ringbottom"></div>
              <div className="mininotebook_point_box">
                <div className="mininotebook_point"></div>
              </div>
              <div className="mininotebook_point_box2">
                <div className="mininotebook_point2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MiniNoteBookStyled>
  );
};

export default MiniNoteBook;
