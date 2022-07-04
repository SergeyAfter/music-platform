import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import PlayerDetails from "../components/PlayerDetails";
import PlayerControls from "../components/PlayerControls";
import ISong from "../interfaces/Song";
import NextSong from "../components/NextSong";
import PlayerFooter from "../components/PlayerFooter";
import useAudioPlayer from "../hooks/useAudioPlayer";
import defaultSongs from "../constants/songs";

const PlayerPage = () => {
  const [songs, setSongs] = useState<ISong[]>(defaultSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  const audioElement = useRef<HTMLAudioElement>(null);
  const { curTime, duration, isPlaying, setIsPlaying, setClickedTime } =
    useAudioPlayer(songs[currentSongIndex], audioElement.current);

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

      if (temp > songs.length - 1) temp = 0;
    } else {
      temp--;

      if (temp < 0) temp = songs.length - 1;
    }
    setCurrentSongIndex(temp);
  };
  const onTimeUpdate = (time: any) => setClickedTime(time);

  return (
    <div className="music-player-container">
      {songs.length > 1 && <NextSong song={songs[nextSongIndex]} />}
      <div className="music-player">
        <audio
          ref={audioElement}
          src={songs[currentSongIndex].src}
          preload="metadata"
        ></audio>
        <PlayerDetails
          song={songs[currentSongIndex]}
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
