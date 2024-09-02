import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const headersObj = {
  headers: {
    "X-RapidAPI-Key": "a60bc52abcmsh4e5dd2ffdd9e116p154b2ejsn4dfbac6cab7c",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};
export const fetchAlbumsData = createAsyncThunk(
  "albums/fetchAlbumsData",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/albums/?ids=${albumId}`,
        headersObj
      );

      const data = response.data.albums[0];

      // Extract necessary details from album data
      const albumDetails = {
        type: data.album_type,
        totalTracks: data.total_tracks,
        name: data.name,
        image: data.images[0]?.url, // Use first available image
        releaseDate: data.release_date,
        tracks: data.tracks.items.map((track) => ({
          id: track.id,
          type: track.type,
          name: track.name,
          preview_url: track.preview_url,
          duration_ms: track.duration_ms,
        })),
      };

      console.log("Album's data", albumDetails);
      return albumDetails; // Return the structured album details
    } catch (error) {
      console.error("Error fetching albums data:", error); // Log the error for debugging

      // Use rejectWithValue to pass the error to the fulfilled or rejected action
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching album data"
      );
    }
  }
);
export const fetchTrackData = createAsyncThunk(
  "tracks/fetchTrackData", // Action type for the thunk
  async (trackId, { rejectWithValue }) => {
    // Pass trackId as a parameter
    try {
      // Make the API request to fetch track data
      const response = await axios.get(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${trackId}`,
        headersObj
      );

      // Extract the data from the response
      const data = response.data.tracks[0].preview_url;
      console.log("track data", data);
      return data; // Return the fetched data
    } catch (error) {
      console.error("Error fetching track data:", error); // Log the error for debugging

      // Use rejectWithValue to pass the error to the fulfilled or rejected action
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching track data"
      );
    }
  }
);
