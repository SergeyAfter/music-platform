import React, { MouseEvent, useRef } from "react";
import * as moment from "moment/moment";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import momentDurationFormatSetup from "moment-duration-format";

import ProgressBarProps from "../interfaces/ProgressBarProps";
momentDurationFormatSetup(moment);

const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  curTime,
  onTimeUpdate,
}) => {
  const bar = useRef<HTMLDivElement>(null);
  const curPercentage = (curTime / duration) * 100;

  const formatDuration = (duration: number) => {
    return moment
      .duration(duration, "seconds")
      .format("mm:ss", { trim: false });
  };

  const calcClickedTime = (e: MouseEvent) => {
    const clickPositionInPage = e.pageX;
    if (bar.current) {
      const barStart =
        bar.current.getBoundingClientRect()?.left + window.scrollX ?? 0;
      const barWidth = bar.current.offsetWidth;
      const clickPositionInBar = clickPositionInPage - barStart;
      const timePerPixel = duration / barWidth;
      return timePerPixel * clickPositionInBar;
    }
  };

  function handleTimeDrag(e: any) {
    onTimeUpdate(calcClickedTime(e));

    const updateTimeOnMove = (eMove: any) => {
      onTimeUpdate(calcClickedTime(eMove));
    };

    document.addEventListener("mousemove", updateTimeOnMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", updateTimeOnMove);
    });
  }

  return (
    <div className="bar">
      <span className="bar__time">{formatDuration(curTime)}</span>
      <div
        ref={bar}
        className="bar__progress"
        style={{
          background: `linear-gradient(to right, orange ${curPercentage}%, white 0)`,
        }}
        onMouseDown={(e: MouseEvent<HTMLDivElement>) => handleTimeDrag(e)}
      >
        <span
          className="bar__progress__knob"
          style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <span className="bar__time">{formatDuration(duration)}</span>
    </div>
  );
};

export default ProgressBar;
