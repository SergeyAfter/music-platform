import React from "react";
import ISong from "../interfaces/Song";
import ProgressBar from "./ProgressBar";
import ProgressBarProps from "../interfaces/ProgressBarProps";

interface PlayerDetailsProps {
  song: ISong;
  progressBarInfo: ProgressBarProps;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  song,
  progressBarInfo,
}) => {
  return (
    <div className="music-player--details">
      <div className="details-img">
        <img
          className="details-img--image"
          src={song.img_src}
          alt={song.title}
        />
      </div>
      <ProgressBar
        duration={progressBarInfo.duration}
        curTime={progressBarInfo.curTime}
        onTimeUpdate={progressBarInfo.onTimeUpdate}
      />
      <div className="artist-info">
        <h3 className="details-title">{song.title}</h3>
        <h4 className="details-artist">{song.artist}</h4>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default PlayerDetails;
