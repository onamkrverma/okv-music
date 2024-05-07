import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { songsApi } from "./services/songsApi";
import songsSlice from "./slice/songsSlice";
import currentSongSlice from "./slice/currentSongSlice";
import { myApi } from "./services/myApi";
import { activateDownloadApi } from "./services/activateDownloadApi";

export const store = configureStore({
  reducer: {
    [songsApi.reducerPath]: songsApi.reducer,
    [myApi.reducerPath]: myApi.reducer,
    [activateDownloadApi.reducerPath]: activateDownloadApi.reducer,
    songsSlice,
    currentSongSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      songsApi.middleware,
      myApi.middleware,
      activateDownloadApi.middleware
    ),
});

setupListeners(store.dispatch);
