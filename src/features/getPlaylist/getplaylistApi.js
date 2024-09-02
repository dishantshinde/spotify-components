import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const headersObj = {
  headers: {
    "X-RapidAPI-Key": "a60bc52abcmsh4e5dd2ffdd9e116p154b2ejsn4dfbac6cab7c",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

// Define the asyncThunk for fetching playlists data
export const fetchPlaylists = createAsyncThunk(
  "playlists/fetchPlaylists", // Action type for the thunk
  async (_, { rejectWithValue }) => {
    // Pass userId or any relevant parameter
    try {
      // Make the API request to fetch playlists data
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/search/?q=featured%20charts&type=playlists&offset=0&limit=10&numberOfTopResults=10`,
        headersObj
      );

      // Extract the data from the response
      const data = response.data.playlists.items.map((ele) => {
        return {
          name: ele.data.name,
          playlistid: ele.data.uri.split(":")[2],
          desc: ele.data.description,
          image: ele.data.images.items[0].sources[0].url,
        };
      });
      console.log("playlist data", data);
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching playlists data:", error); // Log the error for debugging

      // Use rejectWithValue to pass the error to the fulfilled or rejected action
      return rejectWithValue(
        error.response?.data ||
          "An error occurred while fetching playlists data"
      );
    }
  }
);
// Define the asyncThunk for fetching playlist track data
export const fetchPlaylistTrackData = createAsyncThunk(
  "playlists/fetchPlaylistTrackData", // Action type for the thunk
  async (playlistId, { rejectWithValue }) => {
    // Accepts playlistId as a parameter
    try {
      // Make the API request to fetch playlist track data
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistId}&offset=0&limit=100`,
        headersObj
      );

      // Extract the track data from the response
      const tracks = response.data.items.map((ele) => {
        const track = ele.track;
        const albumImages = track.album.images; // Extract album images
        const firstAlbumImage =
          albumImages.length > 0 ? albumImages[0].url : null; // Get the first image URL, if available

        return {
          trackName: track.name,
          trackId: track.id,
          artists: track.artists.map((artist) => artist.name).join(", "),
          albumName: track.album.name,
          albumImage: firstAlbumImage, // Add the first album image URL
          duration: track.duration_ms,
          previewUrl: track.preview_url,
        };
      });

      console.log("Fetched Playlist Tracks with Album Images:", tracks); // For debugging
      return tracks; // Return the fetched track data
    } catch (error) {
      console.error("Error fetching playlist track data:", error); // Log errors for debugging
      return rejectWithValue(
        error.response?.data ||
          "An error occurred while fetching playlist track data"
      );
    }
  }
);
