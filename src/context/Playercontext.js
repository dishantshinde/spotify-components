import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

export default function PlayerContextProvider(props) {
  const refOfAudio = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  const [track, setTrack] = useState(songsData[0]);
  const [playStat, setPlayStat] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const handlePlay = () => {
    refOfAudio.current.play();
    setPlayStat(true);
  };
  const handlePause = () => {
    refOfAudio.current.pause();
    setPlayStat(false);
  };
  const handlePlayWithId = async (id) => {
    await setTrack(songsData[id]);
    await refOfAudio.current.play();
    setPlayStat(true);
  };
  const handlePreviousSong = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await refOfAudio.current.play();
      setPlayStat(true);
    }
  };
  const handleNextSong = async () => {
    if (track.id < songsData.length) {
      await setTrack(songsData[track.id + 1]);
      await refOfAudio.current.play();
      setPlayStat(true);
    }
  };
  const handleSeekSong = async (e) => {
    refOfAudio.current.currentTime =
      (e.nativeEvent.offsetX / seekBackground.current.offsetWidth) *
      refOfAudio.current.duration;
  };
  useEffect(() => {
    setTimeout(() => {
      refOfAudio.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (refOfAudio.current.currentTime / refOfAudio.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(refOfAudio.current.currentTime % 60),
            minute: Math.floor(refOfAudio.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(refOfAudio.current.duration % 60),
            minute: Math.floor(refOfAudio.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [refOfAudio]);

  const contextValue = {
    refOfAudio,
    seekBackground,
    seekBar,
    track,
    setTrack,
    playStat,
    setPlayStat,
    time,
    setTime,
    handlePause,
    handlePlay,
    handlePlayWithId,
    handleNextSong,
    handlePreviousSong,
    handleSeekSong,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
}
