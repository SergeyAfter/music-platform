import { useState, useLayoutEffect } from "react";
import ISong from "../interfaces/Song";

const useAudioPlayer = (song: ISong, audio: HTMLAudioElement | null) => {
  const [duration, setDuration] = useState<number>(0);
  const [curTime, setCurTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (audio) {
      // state setters wrappers
      const setAudioData = () => {
        setDuration(audio?.duration);
        setCurTime(audio?.currentTime);
      };
      const setAudioTime = () => setCurTime(audio.currentTime);

      // DOM listeners: update React state on DOM events
      audio.addEventListener("loadeddata", setAudioData);

      audio.addEventListener("timeupdate", setAudioTime);

      // React state listeners: update DOM on React state changes
      isPlaying ? audio.play() : audio.pause();

      if (clickedTime && clickedTime !== curTime) {
        audio.currentTime = clickedTime;

        setClickedTime(undefined);
      }

      // effect cleanup
      return () => {
        audio.removeEventListener("loadeddata", setAudioData);
        audio.removeEventListener("timeupdate", setAudioTime);
      };
    }
  });

  return {
    curTime,
    duration,
    isPlaying,
    setIsPlaying,
    setClickedTime,
  };
};

export default useAudioPlayer;
