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
      const playlistIdToRemove = action.payload;
      const indexToRemove = state.myPlaylistSongs.findIndex(
        (item) => item.metaData?.playlistId === playlistIdToRemove
      );
      if (indexToRemove !== -1) {
        state.myPlaylistSongs.splice(indexToRemove, 1);
      }
    },

    removePlaylist: (state, action) => {
      const playlistIdToRemove = action.payload;
      const indexToRemove = state.myPlaylistData.findIndex(
        (item) => item.playlistId === playlistIdToRemove
      );
      if (indexToRemove !== -1) {
        state.myPlaylistData.splice(indexToRemove, 1);
      }
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
