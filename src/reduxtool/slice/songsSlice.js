import { createSlice } from '@reduxjs/toolkit'

 const getLocalData = JSON.parse(localStorage.getItem('homepageData'));

const initialState = {
  songsData: getLocalData || {},

}

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    addSongs: (state,action)=>{
      state.songsData = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addSongs } = songsSlice.actions

export default songsSlice.reducer