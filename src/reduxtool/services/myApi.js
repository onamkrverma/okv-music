import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const myApi = createApi({
  reducerPath: "myApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({
    getSongAudioUrls: builder.query({
      query: (videoId) => ({
        url: `song/${videoId}`,
        method: "GET",
      }),
    }),
    getRelatedSongs: builder.query({
      query: (videoId) => ({
        url: `related/${videoId}`,
        method: "GET",
      }),
    }),
    getMyplaylistInfo: builder.query({
      query: () => ({
        url: "localplaylistinfo",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSongAudioUrlsQuery,
  useGetMyplaylistInfoQuery,
  useGetRelatedSongsQuery,
} = myApi;
