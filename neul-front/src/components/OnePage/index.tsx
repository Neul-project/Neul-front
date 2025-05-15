import { ReactNode } from "react";
import { Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import clsx from "clsx";
import { OnePageStyled } from "./styled";

interface OnePageProps {
  type: "left" | "right";
  lineNum: number[];
  children?: ReactNode;
  name?: string;
  popoverContent?: ReactNode;
}

const OnePage = ({
  type,
  lineNum,
  children,
  name,
  popoverContent,
}: OnePageProps) => {
  return (
    <OnePageStyled className={clsx(`onepage_${type}`)}>
      <div className="onepage_note onepage_note1">
        <div className="onepage_note onepage_note2">
          <div className="onepage_note onepage_note3">
            <div className="onepage_note onepage_note4">
              <div className="onepage_note onepage_note5">
                <div className="onepage_note onepage_note6">
                  {lineNum.map((_, i) => (
                    <div
                      key={i}
                      className={`onepage_line onepage_line${i + 1}`}
                    ></div>
                  ))}

                  {/* 왼쪽일 때만 이름 + 설명 표시 */}
                  {type === "left" && name && (
                    <div className="onepage_name_box">
                      <div className="onepage_name">{name}님 상태</div>
                      {popoverContent && (
                        <Popover
                          className="onepage_popover"
                          placement="bottom"
                          content={popoverContent}
                        >
                          <InfoCircleFilled
                            style={{ fontSize: "16px", color: "#c9c9c9" }}
                          />
                        </Popover>
                      )}
                    </div>
                  )}

                  {/* children 자리 */}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnePageStyled>
  );
};

export default OnePage;
