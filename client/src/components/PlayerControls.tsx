import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

interface PlayerControlsProps {
  isPlaying: boolean;
  skipSong: (value: boolean) => void;
  setIsPlaying: (value: boolean) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying = false,
  skipSong,
  setIsPlaying,
}) => {
  return (
    <div className="music-player--controls">
      <button className="skip-btn" onClick={() => skipSong(false)}>
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button className="skip-btn" onClick={() => skipSong(true)}>
        <FontAwesomeIcon icon={faForward} />
      </button>
    </div>
  );
};

export default PlayerControls;
