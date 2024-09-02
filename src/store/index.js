import { configureStore } from "@reduxjs/toolkit";
import getArtists from "../features/getArtists/getArtists";
import getAlbums from "../features/getAlbums/getAlbums";
import getplaylist from "../features/getPlaylist/getplaylist";
export const store = configureStore({
  reducer: {
    artistData: getArtists,
    albumsData: getAlbums,
    playlistData: getplaylist,
  },
});
