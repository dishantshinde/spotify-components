import React, { useContext } from "react";
import { assets, songsData } from "../../assets/assets";
import { PlayerContext } from "../../context/Playercontext";
export default function Player() {
  const {
    track,
    seekBar,
    seekBackground,
    playStat,
    handlePlay,
    handlePause,
    time,
    setTime,
    handlePreviousSong,
    handleNextSong,
    handleSeekSong,
  } = useContext(PlayerContext);
  return (
    <div className="bg-black h-[10%] flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-center m-auto gap-1">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            onClick={handlePreviousSong}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt=""
          />{" "}
          {playStat ? (
            <img
              onClick={handlePause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={handlePlay}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}
          <img
            onClick={handleNextSong}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt=""
          />{" "}
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            onClick={handleSeekSong}
            ref={seekBackground}
            className="w-[60vw] max-w-[500px] bg-gray-300 cursor-pointer rounded-full"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center opacity-70 gap-2">
        <img className="w-4" src={assets.play_icon} alt="" />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.volume_icon} alt="" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
}
