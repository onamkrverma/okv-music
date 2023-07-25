import { createSlice } from "@reduxjs/toolkit";

// local playlist id
const myLocalPlaylist = JSON.parse(localStorage.getItem("myPlaylist"));

const initialState = {
  songsData: [],
  myPlaylistSongs: [],
  myPlaylistData: myLocalPlaylist || [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSongs: (state, action) => {
      state.songsData = action.payload;
    },

    addPlaylist: (state, action) => {
      state.myPlaylistData = action.payload;
    },
    addMyPlaylistSongs: (state, action) => {
      state.myPlaylistSongs = action.payload;
    },
    removePlaylistSongs: (state, action) => {
      state.myPlaylistSongs.splice(
        state.myPlaylistSongs.findIndex(
          (item) => item.metaData?.playlistId === action.payload
        ),
        1
      );
    },
    removePlaylist: (state, action) => {
      state.myPlaylistData.splice(
        state.myPlaylistData.findIndex(
          (item) => item.playlistId === action.payload
        ),
        1
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSongs,
  addPlaylist,
  addMyPlaylistSongs,
  removePlaylistSongs,
  removePlaylist,
} = songsSlice.actions;

export default songsSlice.reducer;
