import React, { useEffect, useState } from "react";
import "./Trending.css";
import "../playlistSongs/PlaylistSongs.css";
import { useGetAllPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import { useDispatch, useSelector } from "react-redux";
import { BsPlayCircleFill } from "react-icons/bs";
import Player from "../../components/player/Player";
import { addSongInfo } from "../../reduxtool/slice/currentSongSlice";
import PlaylistSongsSkeleton from "../playlistSongs/PlaylistSongsSkeleton";
import { useSearchParams } from "react-router-dom";
import Toggle from "../../components/toggle/Toggle";

const Trending = () => {
  useEffect(() => {
    document.title = "Trending Songs • Okv Music";
  }, []);

  const searchParams = useSearchParams();
  const location = searchParams[0].get("loc");
  const [playlistInfo, setPlaylistInfo] = useState([]);
  const [activeToggle, setActiveToggle] = useState(location || "india");

  const toggleList = [
    { name: "India", value: "india" },
    { name: "Global", value: "global" },
  ];

  const playlists = [
    { name: "india", playlistId: "PL4fGSI1pDJn40WjZ6utkIuj2rNg-7iGsq" },
    { name: "global", playlistId: "PL4fGSI1pDJn5kI81J1fYWK5eZRl1zJ5kM" },
  ];

  const activePlaylistId = playlists.find(
    (item) => item.name === activeToggle
  )?.playlistId;

  const { data, isLoading } = useGetAllPlaylistItemsQuery(activePlaylistId);

  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  useEffect(() => {
    if (data) {
      setPlaylistInfo(data.items);
    }
  }, [data]);

  const dispatch = useDispatch();

  const handlePlayThisSong = (videoId) => {
    dispatch(
      addSongInfo({
        id: videoId,
        miniPlayerActive: false,
      })
    );
  };

  return (
    <div className="playlist-songs-container trending-songs-container">
      {isLoading || !playlistInfo.length ? (
        <PlaylistSongsSkeleton amount={10} variant="trending" />
      ) : (
        <div className="container">
          <div className="playlist-songs-header trending-header">
            <h1 className="playlist-title">Top Trending music on YouTube</h1>

            <Toggle
              toggleList={toggleList}
              activeToggle={activeToggle}
              setActiveToggle={setActiveToggle}
            />
          </div>

          {playlistInfo?.map((songs) => (
            <div
              className="playlist-songs-info-wrapper cur-pointer"
              key={songs.etag}
            >
              <div
                className="playlist-songs-info"
                onClick={() =>
                  handlePlayThisSong(songs.snippet?.resourceId?.videoId)
                }
              >
                <div className="playlist-songs-image-wrapper">
                  <img
                    src={songs.snippet.thumbnails?.default?.url}
                    className="playlist-songs-image"
                    alt="playlist-song"
                  />
                  {id === songs.snippet.resourceId.videoId ? (
                    <div className="playing-status-wrapper">
                      <BsPlayCircleFill
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="playlist-songs-title-channel-wrapper">
                  <p className="playlist-songs-title-wrapper">
                    {songs.snippet?.title}
                  </p>
                  <p className="playlist-songs-channel-wrapper">
                    • {songs.snippet?.videoOwnerChannelTitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;
