import { createSlice } from "@reduxjs/toolkit";
import { fetchPlaylists, fetchPlaylistTrackData } from "./getplaylistApi"; // Import the fetchPlaylists function

const initialState = {
  playlistsData: [],
  playlistTracks: [], // State to hold playlists data
};

const playlistsDataSlice = createSlice({
  name: "playlistsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.playlistsData = action.payload; // Update state with fetched data
      })
      .addCase(fetchPlaylistTrackData.fulfilled, (state, action) => {
        state.playlistTracks = action.payload; // Update state with fetched playlist track data
      });
  },
});

export default playlistsDataSlice.reducer;
