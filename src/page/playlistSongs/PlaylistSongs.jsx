import React, { useEffect, useState } from "react";
import "./PlaylistSongs.css";
import { useGetAllPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPlayCircleFill } from "react-icons/bs";
import { addSongInfo } from "../../reduxtool/slice/currentSongSlice";
import PlaylistSongsSkeleton from "./PlaylistSongsSkeleton";

const PlaylistSongs = () => {
  const { urlTitle, playlistId } = useParams();
  const playlistTitle = urlTitle.replaceAll("-", " ");
  const { data, isLoading } = useGetAllPlaylistItemsQuery(playlistId);

  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  const [playlistInfo, setPlaylistInfo] = useState([]);

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

  useEffect(() => {
    document.title = `${
      playlistTitle.slice(0, 1).toUpperCase() + playlistTitle.slice(1)
    } - Playlist • Okv Music`;
  }, [playlistTitle]);

  return (
    <div className="playlist-songs-container">
      {isLoading || !playlistInfo.length ? (
        <PlaylistSongsSkeleton amount={10} variant="playlist" />
      ) : (
        <div className="container">
          <div className="playlist-songs-header">
            <div className="bg-poster-wrapper">
              <img
                className="bg-poster-image"
                src={
                  playlistInfo[0]?.snippet.thumbnails?.maxres
                    ? playlistInfo[0]?.snippet.thumbnails?.maxres?.url
                    : playlistInfo[0]?.snippet.thumbnails?.high?.url
                }
                alt="song poster"
              />
            </div>
            <div className="playlist-songs-header-image-wrapper">
              <img
                className="playlist-songs-header-image"
                src={
                  playlistInfo[0]?.snippet.thumbnails?.maxres
                    ? playlistInfo[0]?.snippet.thumbnails?.maxres?.url
                    : playlistInfo[0]?.snippet.thumbnails?.high?.url
                }
                alt="playlist-poster"
              />
            </div>
            <div className="playlist-title-wrapper">
              <h1 className="playlist-title">{playlistTitle}</h1>
              <p className="playlist-title-subtext">
                Top {playlistTitle}, Refreshed daily
              </p>
            </div>
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

export default PlaylistSongs;
