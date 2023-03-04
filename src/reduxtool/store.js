import { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { songsApi } from './services/songsApi'
import songsSlice from './slice/songsSlice'
import currentSongSlice from './slice/currentSongSlice'

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath] : songsApi.reducer,
    songsSlice,
    currentSongSlice,
  },

  middleware:(getDefaultMiddleware)=>
   getDefaultMiddleware().concat(songsApi.middleware), 

})

setupListeners(store.dispatch)