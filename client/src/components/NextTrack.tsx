import React from "react";
import ITrack from "../interfaces/Track";

interface NextTrackProps {
  track: ITrack;
}

const NextTrack: React.FC<NextTrackProps> = ({ track }) => {
  return (
    <div className="nextsong-container">
      <div className="nextsong-header">Upcoming Track:</div>

      <div className="nextsong-details">
        <img
          className="nextsong-details-img"
          src={track.image}
          alt={track.title}
        />
        <div className="nextsong-details-text">
          <div className="nextsong-details-text-title">
            <b>{track.title}</b> by
          </div>
          <div>{track.artist}</div>
          <div>from album</div>
          <div>
            <b>{track.album}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextTrack;
