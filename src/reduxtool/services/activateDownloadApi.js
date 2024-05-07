import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_SERVER_DOWNLOAD_BASE_URL;

export const activateDownloadApi = createApi({
  reducerPath: "activateDownloadApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({
    getServerStatus: builder.query({
      query: () => ({
        method: "GET",
      }),
    }),
  }),
});

export const { useGetServerStatusQuery } = activateDownloadApi;
