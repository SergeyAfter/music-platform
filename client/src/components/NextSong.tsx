import React from "react";
import ISong from "../interfaces/Song";

interface NextSongProps {
  song: ISong;
}

const NextSong: React.FC<NextSongProps> = ({ song }) => {
  return (
    <div className="nextsong-container">
      <div className="nextsong-header">Upcoming Song:</div>

      <div className="nextsong-details">
        <img
          className="nextsong-details-img"
          src={song.img_src}
          alt={song.title}
        />
        <div className="nextsong-details-text">
          <div className="nextsong-details-text-title">
            <b>{song.title}</b> by
          </div>
          <div>{song.artist}</div>
          <div>from album</div>
          <div>
            <b>{song.album}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextSong;
