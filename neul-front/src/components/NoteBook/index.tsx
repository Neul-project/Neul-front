import clsx from "clsx";
import { NoteBookStyled } from "./styled";
import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import StatusCheck from "@/components/StatusCheck";
import { Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";

const NoteBook = () => {
  const [name, setName] = useState<string>(""); // 피보호자 이름
  const lineNum = Array(10).fill(0);

  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) return;

    // 피보호자 이름은 1번만 불러옴
    axiosInstance
      .get("/patient/name", {
        params: { userId },
      })
      .then((res) => {
        setName(res.data.name);
        console.log("피보호자이름", res.data.name);
      })
      .catch((e) => {
        console.error("피보호자 이름 불러오기 실패:", e);
      });
  }, [userId]);

  const content = (
    <div className="statuscheck_explanation">
      <p>
        <strong>컨디션 기준</strong> <br />
        - 아주 좋음: 피보호자가 매우 건강하고 활동적임. <br />
        - 좋음: 건강하지만 약간의 피로감을 느낄 수 있음. <br />
        - 보통: 특별한 문제가 없지만 조금 피곤해 보임. <br />
        - 나쁨: 건강 상태가 좋지 않거나 피로가 심함. <br />- 아주 나쁨:
        피보호자의 상태가 매우 나쁘고, 즉각적인 관리가 필요함.
      </p>
      <br />
      <p>
        <strong>식사량 기준</strong> <br />
        - 완식: 식사를 모두 섭취함. <br />
        - 대부분 섭취: 식사량의 80% 이상 섭취함. <br />
        - 절반 섭취: 식사량의 50% 정도 섭취함. <br />
        - 조금 섭취: 식사량의 30% 미만 섭취함. <br />- 식사 거부: 식사를
        거부하거나 거의 섭취하지 않음.
      </p>
    </div>
  );

  return (
    <NoteBookStyled className={clsx("notebook_wrap")}>
      <div className="notebook_box">
        <div className="notebook_left">
          <div className="notebook_note notebook_note1">
            <div className="notebook_note notebook_note2">
              <div className="notebook_note notebook_note3">
                <div className="notebook_note notebook_note4">
                  <div className="notebook_note notebook_note5">
                    <div className="notebook_note notebook_note6">
                      {lineNum.map((_, i) => (
                        <div
                          className={`notebook_line notebook_line${i + 1}`}
                        ></div>
                      ))}
                      <div className="notebook_name_box">
                        {/* 피보호자 이름 */}
                        {name && (
                          <div className="notebook_name">{name}님 상태</div>
                        )}
                        <Popover
                          className="notebook_popover"
                          placement="bottom"
                          content={content}
                        >
                          <InfoCircleFilled
                            style={{ fontSize: "16px", color: "#c9c9c9" }}
                          />
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="notebook_right">
          <div className="notebook_note notebook_note1">
            <div className="notebook_note notebook_note2">
              <div className="notebook_note notebook_note3">
                <div className="notebook_note notebook_note4">
                  <div className="notebook_note notebook_note5">
                    <div className="notebook_note notebook_note6">
                      {lineNum.map((_, i) => (
                        <div
                          className={`notebook_line notebook_line${i + 1}`}
                        ></div>
                      ))}
                      <StatusCheck type="book" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoteBookStyled>
  );
};

export default NoteBook;
