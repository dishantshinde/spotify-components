import "./App.css";
import Card from "./components/card/card";
import Player from "./components/player/player";
import Display from "./components/Display/Display";
import { useContext, useEffect } from "react";
import { PlayerContext } from "./context/Playercontext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlbums,
  fetchArtistOverview,
  fetchArtists,
} from "./features/getArtists/getArtistsApi";
import {
  fetchAlbumsData,
  fetchTrackData,
} from "./features/getAlbums/getAlbumsApi";
import { fetchPlaylists } from "./features/getPlaylist/getplaylistApi";
function App() {
  const { refOfAudio, track } = useContext(PlayerContext);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(fetchArtistOverview({ id: "0oOet2f43PA68X5RxKobEy" }));
  //   dispatch(fetchArtists());
  //   // dispatch(fetchAlbumsData("48jkrpDqLhm54sxKM9Xt3V"));
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(fetchTrackData("04hcWUiB7wn1WjQdx6b3zm"));
  //   dispatch(fetchPlaylists());
  // }, [dispatch]);
  const artistOverview = useSelector(
    (state) => state.artistData.artistOverview
  );
  console.log("artist overview", artistOverview);
  return (
    <div className="App">
      <Player />
      <Display />
      <audio ref={refOfAudio} src={track.file} preload="auto"></audio>
    </div>
  );
}

export default App;
