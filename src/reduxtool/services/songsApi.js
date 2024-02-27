import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const selectRandomKey = () => {
  if (process.env.REACT_APP_YT_API.search(",") !== -1) {
    const apiKeys = process.env.REACT_APP_YT_API.split(","); //we are splitting the api keys to make an array
    const random = Math.floor(Math.random() * apiKeys.length); //this will get a random number
    return apiKeys[random];
  } else {
    return process.env.REACT_APP_YT_API;
  }
};

const baseUrl = "https://www.googleapis.com/youtube/v3";

export const songsApi = createApi({
  reducerPath: "songsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({
    getSongsById: builder.query({
      query: (songId) => ({
        url: "videos",
        params: {
          part: ["snippet", "contentDetails"],
          id: songId,
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),

    getPlaylist: builder.query({
      query: (playlistId) => ({
        url: "playlists",
        params: {
          part: "snippet",
          id: playlistId,
          maxResults: "1",
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),
    getPlaylistItems: builder.query({
      query: (playlistId) => ({
        url: "playlistItems",
        params: {
          part: "snippet",
          playlistId: playlistId,
          maxResults: "10",
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),
    getAllPlaylistItems: builder.query({
      query: (playlistId) => ({
        url: "playlistItems",
        params: {
          part: "snippet",
          playlistId: playlistId,
          maxResults: "50",
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),

    getSearchItems: builder.query({
      query: (searchQuery) => ({
        url: "search",
        params: {
          part: "snippet",
          q: searchQuery,
          type: "video",
          maxResults: "50",
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),
    getSearchRelatedItems: builder.query({
      query: (videoId) => ({
        url: "search",
        params: {
          part: "snippet",
          relatedToVideoId: videoId,
          type: "video",
          videoCategoryId: "10",
          maxResults: "10",
          key: selectRandomKey(),
        },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPlaylistItemsQuery,
  useGetSongsByIdQuery,
  useGetSearchItemsQuery,
  useGetSearchRelatedItemsQuery,
  useGetAllPlaylistItemsQuery,
  useGetPlaylistQuery,
} = songsApi;
