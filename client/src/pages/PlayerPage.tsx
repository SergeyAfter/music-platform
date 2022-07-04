import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import PlayerDetails from "../components/PlayerDetails";
import PlayerControls from "../components/PlayerControls";
import ITrack from "../interfaces/Track";
import NextSong from "../components/NextSong";
import PlayerFooter from "../components/PlayerFooter";
import useAudioPlayer from "../hooks/useAudioPlayer";
import defaultTracks from "../constants/tracks";

const PlayerPage = () => {
  const [tracks, setTracks] = useState<ITrack[]>(defaultTracks);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > tracks.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, tracks.length]);

  const audioElement = useRef<HTMLAudioElement>(null);
  const { curTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudioPlayer(tracks[currentSongIndex], audioElement.current);

  useLayoutEffect(() => {
    if (isPlaying) {
      audioElement.current?.play();
    } else {
      audioElement.current?.pause();
    }
  });

  const skipSong = (forwards = true) => {
    let temp = currentSongIndex;
    if (forwards) {
      temp++;

      if (temp > tracks.length - 1) temp = 0;
    } else {
      temp--;

      if (temp < 0) temp = tracks.length - 1;
    }
    setCurrentSongIndex(temp);
  };
  const onTimeUpdate = (time: any) => setClickedTime(time);

  return (
    <div className="music-player-container">
      {tracks.length > 1 && <NextSong song={tracks[nextSongIndex]} />}
      <div className="music-player">
        <audio
          ref={audioElement}
          src={tracks[currentSongIndex].audio}
          preload="metadata"
        ></audio>
        <PlayerDetails
          track={tracks[currentSongIndex]}
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
