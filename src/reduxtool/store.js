import { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { songsApi } from './services/songsApi'
import songsSlice from './slice/songsSlice'

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath] : songsApi.reducer,
    songsSlice,
  },

  middleware:(getDefaultMiddleware)=>
   getDefaultMiddleware().concat(songsApi.middleware), 

})

setupListeners(store.dispatch)