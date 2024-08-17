import Wretch from "wretch";
import queryString from "wretch/addons/queryString";
import { PlaylistItems } from "./youTubeApi.d";

const selectRandomKey = () => {
  const apiKey = process.env.YT_API;
  if (!apiKey) return;
  if (apiKey.search(",") !== -1) {
    const apiKeys = apiKey.split(","); //we are splitting the api keys to make an array
    const random = Math.floor(Math.random() * apiKeys.length); //this will get a random number
    return apiKeys[random];
  } else {
    return apiKey;
  }
};
const baseUrl = "https://www.googleapis.com/youtube/v3";

const youtubeApi = Wretch(baseUrl)
  .headers({ Referer: "https://www.googleapis.com" })
  .addon(queryString)
  .query({ key: selectRandomKey() });

export const getPlaylistItems = async ({
  playlistId,
}: {
  playlistId: string;
}) => {
  const querParams = {
    part: "snippet",
    playlistId: playlistId,
    maxResults: "10",
  };
  const response = (await youtubeApi
    .query(querParams)
    .get("/playlistItems")
    .json()) as PlaylistItems;

  return response;
};
