import React, { useEffect } from "react";
import "./Home.css";
import { useGetPlaylistItemsQuery } from "../../reduxtool/services/songsApi";
import Header from "../../components/header/Header";
import SongsList from "../../components/songsList/SongsList";
import { useDispatch, useSelector } from "react-redux";
import { addSongs } from "../../reduxtool/slice/songsSlice";
import HeroBanner from "./heroBanner/HeroBanner";
import Player from "../../components/player/Player";

const Home = () => {
  const playlistId = {
    newRelesedId: "RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU",
    trendingSongsId: "PL_yIBWagYVjwYmv3PlwYk0b4vmaaHX6aL",
    bollywoodHitsId: "RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
    punjabiFireId: "RDCLAK5uy_kuo_NioExeUmw07dFf8BzQ64DFFTlgE7Q",
  };
  const dispatch = useDispatch();
  const songsData = useSelector((state) => state.songsSlice.songsData);
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  const newSongs = useGetPlaylistItemsQuery(playlistId.newRelesedId, {
    skip: songsData.newSongs !== undefined,
  });
  const trendingSongs = useGetPlaylistItemsQuery(playlistId.trendingSongsId, {
    skip: songsData.trendingSongs !== undefined,
  });
  const bollywoodHitsSongs = useGetPlaylistItemsQuery(
    playlistId.bollywoodHitsId,
    { skip: songsData.bollywoodHitsSongs !== undefined }
  );
  const punjabiFireSong = useGetPlaylistItemsQuery(playlistId.punjabiFireId, {
    skip: songsData.punjabiFireSong !== undefined,
  });

  useEffect(() => {
    if (
      trendingSongs.data &&
      newSongs.data &&
      bollywoodHitsSongs.data &&
      punjabiFireSong.data
    ) {
      dispatch(
        addSongs({
          trendingSongs: trendingSongs.data,
          newSongs: newSongs.data,
          bollywoodHitsSongs: bollywoodHitsSongs.data,
          punjabiFireSong: punjabiFireSong.data,
        })
      );
    }
    // eslint-disable-next-line
  }, [
    trendingSongs.data,
    newSongs.data,
    bollywoodHitsSongs.data,
    punjabiFireSong.data,
  ]);

  return (
    <div className="home-section">
      <Header />
      <HeroBanner
        songsData={songsData.trendingSongs?.items}
        isLoading={trendingSongs.isLoading}
      />
      <SongsList
        title={"Trending Songs"}
        songsData={songsData.trendingSongs?.items}
        isLoading={trendingSongs.isLoading}
        playlistId={playlistId.trendingSongsId}
      />
      <SongsList
        title={"New Released"}
        songsData={songsData.newSongs?.items}
        isLoading={newSongs.isLoading}
        playlistId={playlistId.newRelesedId}
      />
      <SongsList
        title={"Bollywood HitsList"}
        songsData={songsData.bollywoodHitsSongs?.items}
        isLoading={bollywoodHitsSongs.isLoading}
        playlistId={playlistId.bollywoodHitsId}
      />
      <SongsList
        title={"Punjabi Fire"}
        songsData={songsData.punjabiFireSong?.items}
        isLoading={punjabiFireSong.isLoading}
        playlistId={playlistId.punjabiFireId}
      />

      {id && <Player />}
    </div>
  );
};

export default Home;
