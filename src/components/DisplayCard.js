import React, { useContext, useEffect } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchArtistOverview } from "./../features/getArtists/getArtistsApi";
import { fetchPlaylistTrackData } from "./../features/getPlaylist/getplaylistApi";
import { PlayerContext } from "./../context/Playercontext";
import { fetchAlbumsData } from "./../features/getAlbums/getAlbumsApi";
import Vibrant from "node-vibrant";

export default function DisplayCard({ displayRef }) {
  const { handlePlayWithId } = useContext(PlayerContext);
  const { type, id } = useParams();
  const dispatch = useDispatch();
  const isArtist = type === "artist";

  // Fetch data from the Redux store based on the `type`
  const actionMap = [
    { type: "album", action: fetchAlbumsData },
    { type: "artist", action: fetchArtistOverview },
    { type: "playlist", action: fetchPlaylistTrackData },
  ];

  const selectDataByType = (state, type) => {
    switch (type) {
      case "album":
        return state.albumsData.albumData;
      case "artist":
        return state.artistData.artistOverview;
      case "playlist":
        return state.playlistData.playlistsData;
      case "radio":
        return state.radioData.radios;
      default:
        return null;
    }
  };

  const data = useSelector((state) => selectDataByType(state, type));

  useEffect(() => {
    const actionEntry = actionMap.find((entry) => entry.type === type);
    if (actionEntry && actionEntry.action) {
      dispatch(actionEntry.action(id));
    }
  }, [type, id, dispatch]);

  useEffect(() => {
    if (data && data.image) {
      console.log("inside vibrant useeffect");
      Vibrant.from(data.image)
        .getPalette()
        .then((palette) => {
          const dominantColor = palette.Vibrant?.hex || "#121212"; // Default background
          console.log("dominant color", dominantColor);
          if (displayRef.current) {
            displayRef.current.style.background = `linear-gradient(, ${dominantColor})`;
          }
        })
        .catch((err) => console.error("Error extracting color:", err));
    }
  }, [data, displayRef]);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {data ? (
          <>
            <div
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                className="object-cover w-full h-full"
                src={data.image}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                {data.name}
              </h2>
              <h4>{data.desc}</h4>
              <p className="mt-1">
                <img
                  className="inline-block w-5"
                  src={data.spotify_logo}
                  alt=""
                />
                <b>Spotify</b>
                &#8226; 132 likes &#8226; <b>50 songs,</b>
                about 2 hr 30 min
              </p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>
          Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {data && data.toptracks ? (
        data.toptracks.map((item, indx) => (
          <div
            onClick={() => handlePlayWithId(item.id)}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            key={indx}
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{indx + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{item.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))
      ) : (
        <p>No top tracks available.</p>
      )}
    </>
  );
}
