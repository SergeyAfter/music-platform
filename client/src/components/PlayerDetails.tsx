import React from "react";
import ITrack from "../interfaces/Track";
import ProgressBar from "./ProgressBar";
import ProgressBarProps from "../interfaces/ProgressBarProps";

interface PlayerDetailsProps {
  track: ITrack;
  progressBarInfo: ProgressBarProps;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({
  track,
  progressBarInfo,
}) => {
  return (
    <div className="music-player--details">
      <div className="details-img">
        <img
          className="details-img--image"
          src={track.image}
          alt={track.title}
        />
      </div>
      <ProgressBar
        duration={progressBarInfo.duration}
        curTime={progressBarInfo.curTime}
        onTimeUpdate={progressBarInfo.onTimeUpdate}
      />
      <div className="artist-info">
        <h3 className="details-title">{track.title}</h3>
        <h4 className="details-artist">{track.artist}</h4>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default PlayerDetails;
