import { ReactNode } from "react";
import { Popover } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import clsx from "clsx";
import { OnePageStyled } from "./styled";
import SwiperImg from "../ActivityContent/SwiperImg";
import SubContent from "../ActivityContent/SubContent";

interface OnePageProps {
  type: "left" | "right";
  lineNum: number[];
  children?: ReactNode;
  name?: string;
  popoverContent?: ReactNode;
  activity?: string;
  img?: string[];
  activitytype?: string;
  rehabilitation?: string;
  note?: string;
  id?: string;
  title?: string;
  patientname?: string;
}

const OnePage = ({
  type,
  lineNum,
  children,
  name,
  popoverContent,
  activity,
  img,
  rehabilitation,
  note,
  id,
  activitytype,
  title,
  patientname,
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

                  {/* 활동기록 왼쪽 */}
                  {type === "left" && activity === "swiper" && (
                    <SwiperImg
                      img={img}
                      title={title!}
                      patientname={patientname!}
                    />
                  )}

                  {/* 활동기록 오른쪽 */}
                  {type === "right" && activity === "subcontent" && (
                    <SubContent
                      type={activitytype!}
                      rehabilitation={rehabilitation!}
                      note={note!}
                      id={id!}
                    />
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
