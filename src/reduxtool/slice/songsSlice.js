import { createSlice } from "@reduxjs/toolkit";

// local playlist id
const myLocalPlaylist = JSON.parse(localStorage.getItem("myPlaylist"));

const initialState = {
  myPlaylistInfo: myLocalPlaylist || [],
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addPlaylistInfo: (state, action) => {
      state.myPlaylistInfo.push(action.payload);
    },
    removePlaylist: (state, action) => {
      const playlistIdToRemove = action.payload;
      const updatedList = state.myPlaylistInfo.filter(
        (item) => item.id !== playlistIdToRemove
      );
      state.myPlaylistInfo = updatedList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlaylistInfo, removePlaylist } = songsSlice.actions;

export default songsSlice.reducer;
