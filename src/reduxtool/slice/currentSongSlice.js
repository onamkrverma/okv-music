import { createSlice } from '@reduxjs/toolkit'

 const getLocalData = JSON.parse(localStorage.getItem('currentSongInfo'));

const initialState = {
  currentSongInfo: getLocalData || {},

}

export const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    addSongInfo: (state,action)=>{
      state.currentSongInfo = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addSongInfo } = currentSongSlice.actions

export default currentSongSlice.reducer