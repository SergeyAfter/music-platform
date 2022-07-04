import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import PlayerDetails from "../components/PlayerDetails";
import PlayerControls from "../components/PlayerControls";
import ITrack from "../interfaces/Track";
import NextTrack from "../components/NextTrack";
import PlayerFooter from "../components/PlayerFooter";
import useAudioPlayer from "../hooks/useAudioPlayer";
import defaultTracks from "../constants/tracks";

const PlayerPage = () => {
  const [tracks, setTracks] = useState<ITrack[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [nextTrackIndex, setNextTrackIndex] = useState(0);

  useEffect(() => {
    setNextTrackIndex(() => {
      if (currentTrackIndex + 1 > tracks.length - 1) {
        return 0;
      } else {
        return currentTrackIndex + 1;
      }
    });
  }, [currentTrackIndex, tracks.length]);

  const audioElement = useRef<HTMLAudioElement>(null);
  const { curTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudioPlayer(tracks[currentTrackIndex], audioElement.current);

  useLayoutEffect(() => {
    if (isPlaying) {
      audioElement.current?.play();
    } else {
      audioElement.current?.pause();
    }
  });

  const skipSong = (forwards = true) => {
    let temp = currentTrackIndex;
    if (forwards) {
      temp++;

      if (temp > tracks.length - 1) temp = 0;
    } else {
      temp--;

      if (temp < 0) temp = tracks.length - 1;
    }
    setCurrentTrackIndex(temp);
  };
  const onTimeUpdate = (time: any) => setClickedTime(time);

  return (
    <div className="music-player-container">
      {tracks.length > 1 && <NextTrack track={tracks[nextTrackIndex]} />}
      <div className="music-player">
        <audio
          ref={audioElement}
          src={tracks[currentTrackIndex].audio}
          preload="metadata"
        ></audio>
        <PlayerDetails
          track={tracks[currentTrackIndex]}
          progressBarInfo={{ duration, curTime, onTimeUpdate }}
        />

        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          skipSong={skipSong}
        />

        <PlayerFooter />
      </div>
    </div>
  );
};

export default PlayerPage;
